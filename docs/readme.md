<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [Alert][1]
-   [ConfirmButton][2]
-   [InfoButton][3]
-   [DialogButton][4]
-   [Button][5]
-   [DeleteButton][6]
-   [OptionsButton][7]
-   [ButtonToolbar][8]
-   [Dialog][9]
-   [Form][10]
-   [Form][11]
-   [GridRow][12]
-   [Col][13]
-   [ContainerFluid][14]
-   [ListGroup][15]
-   [ListGroupItem][16]
-   [Panel][17]
-   [PanelHeader][18]
-   [PanelHeader][19]
-   [PanelFooter][20]
-   [CountPanel][21]
-   [Inset][22]
-   [RouterLink][23]
-   [Table][24]
-   [ActionTable][25]
-   [Tabs][26]
-   [JsonView][27]
-   [YamlView][28]
-   [MenuItem][29]
-   [DataView][30]
-   [HTML][31]
-   [MarkDown][32]
-   [DebugPanel][33]
-   [Listing][34]
-   [Error][35]
-   [Actions][36]

## Alert

Displays an alert box with optional dismiss button and/or self dismissing

**Parameters**

-   `props` **[object][37]** 
    -   `props.bsClass` **[string][38]** Bootstrap Classname
    -   `props.children` **[array][39]** Array of components to put inside the alert
    -   `props.closeLabel` **[string][38]** Text to place in the close button
    -   `props.dismissAfter` **[number][40]** Dismiss the alert after x milliseconds has elapsed
    -   `props.dismissable` **[boolean][41]** If true the place a close button on the alert and allow user to dismiss the alert
    -   `props.onDismiss` **[function][42]** Callback when the alert is dismissed
    -   `props.type` **(`"info"` \| `"success"` \| `"warning"` \| `"danger"`)** Type of alert to be shown

## ConfirmButton

**Extends DialogButton**

Generates a button that when clicked prompts the user with for a Yes/No answer.  Executs onYes/No when button is clicked.

**Parameters**

-   `props` **[object][37]** 
    -   `props.onYes` **[function][42]** Callbacked when Yes button is clicked
    -   `props.onNo` **[function][42]** Callbacked when No button is clicked
    -   `props.actions`  
    -   `props.props` **...any** 

## InfoButton

**Extends DialogButton**

Generates a button that when clicked provides the user with a dialog of information.

**Parameters**

-   `props` **[object][37]** 
    -   `props.onOk` **[function][42]** Callback to call when Ok button is clicked
    -   `props.caption` **[string][38]** Text to display on the button
    -   `props.title` **[string][38]** Title to place in the dialog box
    -   `props.message` **[string][38]** Text to display within the dialog box
    -   `props.actions`  
    -   `props.props` **...any** 

## DialogButton

Generates a button that when clicked prompts the user with a dialog.

**Parameters**

-   `props` **[object][37]** 
    -   `props.onCancel` **[function][42]** Callbacked when user cancels the dialog
    -   `props.children` **[array][39]** Array of children to be placed into the body of the dialog
    -   `props.caption` **[string][38]** Caption to put on the button
    -   `props.title` **[string][38]** Title of the dialog when it is displayed
    -   `props.message` **[string][38]** Message to be displayed (instead of using children) inside the dialog
    -   `props.visible` **[boolean][41]** Show the dialog
    -   `props.actions` **[array][39]** Array of actions to place in the dialog
    -   `props.fetch` **[object][37]** Hash of remote requests to fetch before showing dialog

## Button

Generates an HTML Button

## DeleteButton

**Extends Button**

Generates a button that when clicked performs an HTTP DELETE on the target.

**Parameters**

-   `props` **[object][37]** 
    -   `props.caption` **[string][38]** Text to display on the button
    -   `props.title` **[string][38]** Title to place in the confirmation dialog box
    -   `props.message` **[string][38]** Text to display within the dialog box
    -   `props.successUrl` **[string][38]** URL to navigate to on a successful delete operation

## OptionsButton

**Extends Button**

Generates a drop down button with a default action that navigates to a location.

**Parameters**

-   `props` **[object][37]** 
    -   `props.caption` **[string][38]** Caption to put on the button
    -   `props.items` **[array][39]** Array of children to be placed in the dropdown when shown
    -   `props.to` **[string][38]** Target to navitgate to when clicked
    -   `props.expanded`   (optional, default `false`)

## ButtonToolbar

Generates a toolbar of buttons

## Dialog

**Extends Component**

Generates a dialog for the user to interact with.

**Parameters**

-   `props` **[object][37]** 
    -   `props.onHide` **[function][42]** Callbacked when the dialog should be hidden
    -   `props.children` **[array][39]** Array of children to be placed into the body of the dialog
    -   `props.title` **[string][38]** Title of the dialog when it is displayed
    -   `props.message` **[string][38]** Message to be displayed (instead of using children) inside the dialog
    -   `props.actions` **[array][39]** Array of actions to place in the dialog
    -   `props.footer` **Component** Content to put in the footer of the dialog
    -   `props.visible`   (optional, default `false`)

## Form

**Extends Form**

JsonSchema-Form - more info at [https://github.com/mozilla-services/react-jsonschema-form][43]

**Parameters**

-   `props` **[object][37]** 
    -   `props.schema` **[object][37]** Kong Schema for the data to be edited
    -   `props.data` **any** Default values to be displayed within the form
    -   `props.dataRoot` **any** Root key into data to use to source values for form
    -   `props.successUrl` **[string][38]** URL to navigate to upon a succesful submit of the form
    -   `props.submitTo` **([string][38] \| [object][37])** URL or URL Options to submit the form to
        -   `props.submitTo.url` **[string][38]** URL to send to
        -   `props.submitTo.method` **[string][38]** HTTP Method to submit with (default POST)
        -   `props.submitTo.headers` **[string][38]** HTTP Headers to append to the request
    -   `props.mapper` **[function][42]** Used to mutate data returned from the form before sending it to the submitTo destination

## Form

JsonSchema-Form - more info at [https://github.com/mozilla-services/react-jsonschema-form][43]

**Parameters**

-   `props` **[object][37]** 
    -   `props.schema` **[object][37]** JsonSchema for the data to be edited
    -   `props.schemaEncoder` **[function][42]** Encoder to allow encoding from one schema type to JsonSchema-Form type
    -   `props.uiSchemaEncoder` **[function][42]** Encoder to allow encoding from one schema type to JsonSchema-Form type for the display
    -   `props.data` **any** Default values to be displayed within the form
    -   `props.dataRoot` **any** Root key into data to use to source values for form
    -   `props.successUrl` **[string][38]** URL to navigate to upon a succesful submit of the form
    -   `props.submitTo` **([string][38] \| [object][37])** URL or URL Options to submit the form to
        -   `props.submitTo.url` **[string][38]** URL to send to
        -   `props.submitTo.method` **[string][38]** HTTP Method to submit with (default POST)
        -   `props.submitTo.headers` **[string][38]** HTTP Headers to append to the request
    -   `props.mapper` **[function][42]** Used to mutate data returned from the form before sending it to the submitTo destination
    -   `props.onSubmit` **[function][42]** Called when the form is submitted

## GridRow

A Grid row, typically contains Col's

**Parameters**

-   `props`  

## Col

A grid column

**Parameters**

-   `props` **[object][37]** 
    -   `props.size` **[number][40]** Size of the column if you don't want to specify individual screen sizes
    -   `props.lg` **[number][40]** Size of the column when on a large screen
    -   `props.md` **[number][40]** Size of the column when on a medium screen
    -   `props.sm` **[number][40]** Size of the column when on a small screen
    -   `props.xs` **[number][40]** Size of the column when on a extra-small screen

## ContainerFluid

Grid container for rows and columns

**Parameters**

-   `$0` **[Object][37]** 
    -   `$0.children`  

## ListGroup

Displays a grouped listing of items

**Parameters**

-   `props` **[object][37]** 
    -   `props.children` **[array][39]** Children to place in the list

## ListGroupItem

Item to be placed within a ListGroup

**Parameters**

-   `props` **[object][37]** 
    -   `props.link` **[object][37]** Link to where clicking the item should take the user
    -   `props.badge` **[object][37]** Icon or Badge to display next to the item
    -   `props.children` **[array][39]** Children to place in the item

## Panel

A panel for displaying a title, icon, and a count.

**Parameters**

-   `props` **[object][37]** 
    -   `props.title` **[string][38]** Optional title to be placed on the panel
    -   `props.header` **[string][38]** Optional header to be placed on the panel
    -   `props.footer` **[string][38]** Optional footer to be placed on the panel
    -   `props.children` **[string][38]** Children to be placed inside the panel
    -   `props.type` **[string][38]** Color for the container (default, primary, success, info, warning, danger)
    -   `props.size` **[number][40]** Size of the panel in column mode if you don't want to specify individual screen sizes
    -   `props.lg` **[number][40]** Size of the column when on a large screen
    -   `props.md` **[number][40]** Size of the column when on a medium screen
    -   `props.sm` **[number][40]** Size of the column when on a small screen
    -   `props.xs` **[number][40]** Size of the column when on a extra-small screen
    -   `props.inset` **[boolean][41]** Boolean to inset the contents of the panel
    -   `props.maxHeight` **[number][40]** Maxium hight in pixels that the panel can grow to
    -   `props.style` **[object][37]** Additional styling options

## PanelHeader

A header area that can be placed within a panel

**Parameters**

-   `props` **[object][37]** 
    -   `props.children` **[object][37]** Children to be placed within the panel header

## PanelHeader

A panel for displaying a title within a panel

**Parameters**

-   `props` **[object][37]** 
    -   `props.title` **[string][38]** The title
    -   `props.children` **[object][37]** Children to be placed within the title

## PanelFooter

A footer that can be placed within a panel

**Parameters**

-   `props` **[object][37]** 
    -   `props.className` **[string][38]** Additional class names to apply to the container
    -   `props.Component` **[object][37]** Component to be placed within the panel footer
    -   `props.children` **[object][37]** Children to be placed within the panel footer

## CountPanel

A panel for displaying a title, icon, and a count.

**Parameters**

-   `props` **[object][37]** 
    -   `props.className` **[string][38]** Additional class names to apply to the container
    -   `props.count` **[number][40]** Number to be displayed
    -   `props.color` **[string][38]** Color for the container (default, primary, success, info, warning, danger)
    -   `props.link` **[string][38]** Page user should be taken to when clicked
    -   `props.title` **[string][38]** Text to be displayed with icon and count
    -   `props.more` **[string][38]** Additional text to be displayed below the icon, count and title
    -   `props.Icon` **[string][38]** The icon to be displayed alongside the count

## Inset

A container to be placed within a panel that insets the contents

**Parameters**

-   `props` **[object][37]** 
    -   `props.children` **[object][37]** Children to be placed within the panel

## RouterLink

Link to another page

**Parameters**

-   `props` **[object][37]** 
    -   `props.caption` **[object][37]** Text to be displayed within the link
    -   `props.children` **[object][37]** Children to be wrapped
    -   `props.to` **[object][37]** Path to page to link to
    -   `props.props` **...any** 

## Table

**Extends Component**

Displays a table on the screen from the provided items.  Calculates the columns based on the passed in items keys.

**Parameters**

-   `props` **[object][37]** 
    -   `props.items` **[array][39]** The items to be displayed within the table
    -   `props.columns` **[array][39]** If specified then show only the columns listed
    -   `props.suppress` **[array][39]** Field names to not display within the table
    -   `props.filterable` **[boolean][41]** If true the allow contents to be filtered by column
    -   `props.showPagination` **[boolean][41]** Show the pagination controls
    -   `props.showPaginationTop` **[boolean][41]** If showPagination is true show the top pagination controls
    -   `props.showPaginationBottom` **[boolean][41]** If showPagination is true show the bottom pagination controls

## ActionTable

**Extends Table**

A table with standard actions in the last column for each row

**Parameters**

-   `props` **[object][37]** 
    -   `props.actions` **[array][39]** List of actions to be displayed in the last column

## Tabs

**Extends React.Component**

Renders a section of tabs and proper content when a tab is selected

**Parameters**

-   `props` **[object][37]** 
    -   `props.selected` **[number][40]** Number of currently selected tab (optional, default `0`)
    -   `props.tabs` **[array][39]** The items to be displayed within the table
        -   `props.tabs.title` **[array][39]** Title of the tab
        -   `props.tabs.children` **[array][39]** Children displayed when tab is selected

## JsonView

Renders a pretty or JSON.stringify(data, null, 2) view of data

**Parameters**

-   `props` **[object][37]** 
    -   `props.json` **[object][37]** Data to be displayed
    -   `props.data` **[object][37]** Data to be displayed
    -   `props.pretty` **[boolean][41]** If true then renders a tree like strucutre of the data, if false then renders a pre wrapped JSON.stringify() version of the data (optional, default `false`)

## YamlView

Renders a pretty or YAML.safeDump(src, {indent: 2}) view of data

**Parameters**

-   `props` **[object][37]** 
    -   `props.json` **[object][37]** Data to be displayed
    -   `props.data` **[object][37]** Data to be displayed
    -   `props.pretty` **[boolean][41]** If true then renders a tree like strucutre of the data, if false then renders a pre wrapped JSON.stringify() version of the data (optional, default `false`)

## MenuItem

Generates a menu item for use within Menus

**Parameters**

-   `props` **[object][37]** 

## DataView

Creates an appropriate view of the passed in data, for Arrays will display a table, for Objects will display a hybrid display.

**Parameters**

-   `props` **[object][37]** 
    -   `props.inset` **[boolean][41]** Should the content be inset
    -   `props.data` **any** Data to be displayed on the screen
    -   `props.footerContents` **any** Any contents that should be placed in the footer of the view
    -   `props.footerActions` **any** Actions that should be placed in the footer of the view
    -   `props.View` **Component** Force the view by supplying the type

## HTML

Renders HTML directly

**Parameters**

-   `props` **[object][37]** 
    -   `props.className` **[string][38]** HTML Class Name, if not specified then 'embedded-html' is used
    -   `props.children` **[string][38]** HTML to be displayed

## MarkDown

Renders MarkDown directly

**Parameters**

-   `props` **[object][37]** 
    -   `props.children` **[string][38]** Markdown to be displayed

## DebugPanel

Creates a pre element that contains JSON.stringify(props, null, 2) of the props passed to it

**Parameters**

-   `props` **[object][37]** JSON Serializeable object to be displayed

## Listing

Generates a list of Children from the list provided.

**Parameters**

-   `props` **[object][37]** 
    -   `props.list` **[array][39]** List of items to itterate over
    -   `props.children` **[array][39]** Collection of Components to render

## Error

Creates an Alert containing details of the passed in error

**Parameters**

-   `props` **[object][37]** 
    -   `props.error` **[object][37]** Error to be displayed within the alert

## Actions

Provides a list of actions to be displayed

**Parameters**

-   `props` **[object][37]** 
    -   `props.actions` **[array][39]** List of actions to be displayed
    -   `props.data` **[array][39]** The data to work with

[1]: #alert

[2]: #confirmbutton

[3]: #infobutton

[4]: #dialogbutton

[5]: #button

[6]: #deletebutton

[7]: #optionsbutton

[8]: #buttontoolbar

[9]: #dialog

[10]: #form

[11]: #form-1

[12]: #gridrow

[13]: #col

[14]: #containerfluid

[15]: #listgroup

[16]: #listgroupitem

[17]: #panel

[18]: #panelheader

[19]: #panelheader-1

[20]: #panelfooter

[21]: #countpanel

[22]: #inset

[23]: #routerlink

[24]: #table

[25]: #actiontable

[26]: #tabs

[27]: #jsonview

[28]: #yamlview

[29]: #menuitem

[30]: #dataview

[31]: #html

[32]: #markdown

[33]: #debugpanel

[34]: #listing

[35]: #error

[36]: #actions

[37]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[38]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[39]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[40]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[41]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[42]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[43]: https://github.com/mozilla-services/react-jsonschema-form
