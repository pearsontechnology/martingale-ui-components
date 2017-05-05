# Martingale ui-components

Collection of all of the base UI components used within Martingale. These build on top of ReactBootstrap and provide additional functionality necessary to utilize PageSchema and Provider to their fullest extent.

## Install

Available once we opensource everything

```sh
yarn add martingale-ui-components
```

## Running tests

```
yarn test
```

## Creating a build

```
yarn compile
```

# Components

## ActionTable

### Properties

 * actions -  
 * items - array
 * mapper - func

## Alert

### Properties

 * bsClass - string
 * bsStyle - string
 * children -  
 * closeLabel - string
 * dismissAfter - bool
 * dismissable - bool
 * onDismiss - func
 * type - string

## BaseDialog

### Properties

 * actions - object
 * children -  
 * message - string
 * onCancel - func
 * title - string
 * visible - bool

## Button

### Properties

 * btnStyle - string
 * children -  

## Col

### Properties

 * children -  
 * lg - number
 * md - number
 * size - number
 * sm - number
 * sx - number

## ConfirmButton

### Properties

 * btnStyle - string
 * caption - string
 * children -  
 * dialogMessage - string
 * dialogOpen - bool
 * dialogTitle - string
 * onCancel - func
 * onNo - func
 * onYes - func

## ConfirmDialog

### Properties

 * actions - object
 * children -  
 * message - string
 * onCancel - func
 * title - string
 * visible - bool

## ContainerFluid

### Properties

 * children -  

## CountPanel

## Form

### Properties

 * onSubmit - func
 * schema - object
 * submitTo -  
 * value - any

## IconAPI

## IconAlert

## IconBilling

## IconCalendar

## IconCluster

## IconComment

## IconConsumer

## IconDashboard

## IconDatabase

## IconGateway

## IconInbox

## IconLogOut

## IconLogo

## IconNote

## IconOrder

## IconPlugin

## IconSettings

## IconSupport

## IconTask

## IconTimer

## IconUser

## InfoButton

### Properties

 * btnStyle - string
 * caption - string
 * children -  
 * dialogMessage - string
 * dialogOpen - bool
 * dialogTitle - string
 * onCancel - func
 * onOk - func

## InfoDialog

### Properties

 * actions - object
 * children -  
 * message - string
 * onCancel - func
 * onOk - func
 * title - string
 * visible - bool

## KongForm

### Properties

 * onSubmit - func
 * schema - object
 * submitTo -  
 * value - any

## Link

### Properties

 * caption - string
 * children -  
 * className - string
 * to - string

## ListGroup

### Properties

 * children -  

## ListGroupItem

### Properties

 * badge - string
 * children -  
 * link - string

## Panel

### Properties

 * children -  
 * inset -  
 * lg - number
 * md - number
 * size - number
 * sm - number
 * title - string
 * type - string
 * xs - number

## PanelFooter

### Properties

 * children -  
 * className - string
 * color - string
 * count - number
 * icon - func
 * link - string
 * more - string
 * title - string

## PanelHeader

### Properties

 * children -  

## PanelInset

### Properties

 * children -  

## PanelTitle

### Properties

 * children -  
 * title - string

## Row

### Properties

 * children -  

## TForm

## Table

### Properties

 * items - array

## Text

### Properties

 * Component -  
 * children -  
 * className - string
 * value - string
