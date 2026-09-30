# Table Playground

A playground for tables built with the [Tako](https://www.npmjs.com/package/@krakentech/tako-html) design system (`@krakentech/tako-html`), plus a small set of custom classes.

## Base structure

Every table must sit inside a wrapper:

```html
<div class="tako-table__wrapper">
  <table class="tako-table">
    ...
  </table>
</div>
```

## Default overrides

These rules apply to every `.tako-table` automatically. No extra classes are needed.

| Property                | Value                                                    |
| ----------------------- | -------------------------------------------------------- |
| Column min-width        | `200px`                                                  |
| Cell min-height         | `54px`                                                   |
| Cell horizontal padding | `12px`                                                   |
| Header font             | `16px`, semibold (`600`)                                 |
| Body font               | `16px`, regular (`400`)                                  |
| Cell content            | Wraps onto multiple lines                                |
| Row background          | `#FFFFFF` (no striping)                                  |
| Row hover background    | `#F2F2F4`                                                |
| Wrapper                 | Horizontal scroll, `1px solid #DDD` border, `8px` radius |
| Last row                | No bottom border                                         |

## Custom classes

| Class                            | Apply to              | Description                                                                                         |
| -------------------------------- | --------------------- | --------------------------------------------------------------------------------------------------- |
| `.tako-table__sticky-col`        | `th`, `td`            | Makes the column sticky on the left while the table scrolls horizontally.                           |
| `.tako-table__sticky-col--right` | `th`, `td`            | Modifier. Use with `.tako-table__sticky-col` to stick the column on the right.                      |
| `.tako-table__truncate`          | Element inside a cell | Keeps content on one line and truncates it with an ellipsis at `200px`.                             |
| `.tako-table__select-cell`       | `th`, `td`            | Narrow (`56px`) column for row selection checkboxes.                                                |
| `.tako-table__row--selected`     | `tr`                  | Selected row background `#BFEAFC`, `#7ED4F9` on hover. Added automatically by the selection script. |

### Sticky columns

Add the class to the header cell and to every body cell in that column.

```html
<!-- First column, sticky on the left -->
<th class="tako-table__sticky-col">Asset Number</th>
<td class="tako-table__sticky-col">AST-2401</td>

<!-- Last column, sticky on the right -->
<th class="tako-table__sticky-col tako-table__sticky-col--right">Actions</th>
<td class="tako-table__sticky-col tako-table__sticky-col--right">...</td>
```

### Truncation

Cell content wraps by default. To truncate it instead, wrap the content in an element with the class:

```html
<td><span class="tako-table__truncate">A long value that ends with an ellipsis</span></td>
```

### Selectable rows

Add `data-selectable-table` to the table and put a checkbox in the first cell of each row. For a select-all control, add a checkbox with `data-select-all` to the header.

```html
<table class="tako-table" data-selectable-table>
  <thead>
    <tr>
      <th class="tako-table__select-cell">
        <input type="checkbox" data-select-all aria-label="Select all rows" />
      </th>
      <th>Asset</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="tako-table__select-cell">
        <input type="checkbox" aria-label="Select Network switch row" />
      </td>
      <td>Network switch</td>
    </tr>
  </tbody>
</table>
```

When selection changes, the script:

- Toggles `.tako-table__row--selected` on the row.
- Selects or clears every row when the header checkbox is clicked.
- Checks the header checkbox when all rows are selected, and shows it as indeterminate when only some rows are selected.
