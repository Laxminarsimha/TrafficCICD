# Common Component Library

Core Angular components used across Imagine Communications UI projects, shared through an NPM module.

### Installation

In order to use components out of this library, the `@imaginecom` NPM scope must be configured to point to the internal Imagine NPM repository. Details of checking this are listed below in [Scope and the Internal NPM Repository](#scope-and-the-internal-npm-repository).

To install this library for use by a project:

```
npm install --save-dev @imaginecom/common-component-lib
```

Then components out of the library can be imported and used:

```
import { BroadcastCalendarComponent } from '@imaginecom/common-component-lib';
```

### Scope and the Internal NPM Repository

In order to install this library or any that uses the `@imaginecom` NPM scope, the Imagine Communications NPM repository must be associated with the `@imaginecom` scope with the NPM command line.  This will ensure that when NPM is installing or interacting with any packages that use the `@imaginecom` scope, it accesses the internal NPM respository instead of the public `npmjs.org` repository.

This project contains an `.nmprc` file that associates the `@imaginecom` NPM scope with the appropriate repository.  When executing NPM commands in a directory within the project, it should pick up the scope association automatically.

Working outside of this directory the scope may not exist.  In these cases the scope can be set globally as described below.

To test that the scope association is working, you can verify that it is accessing the correct repsitory by executing the following NPM command:

```
npm config get @imaginecom:registry
```

Which should print the current scope association based on the combined NPM configuration that is in effect in the current directory:

```
http://npm.xgproduct.com:4873
```

If instead `undefined` is returned, the scope association can be set globally as described below.

#### Globally Setting `@imaginecom` Scope 

Use the following command once for a workstation to ensure the `@imaginecom` scope is always associated with the internal NPM respository:

```
npm config set @imaginecom:registry=http://npm.xgproduct.com:4873
```

To check if the `@imaginecom` scope is properly set, use:

```
npm config get @imaginecom:registry
```

Which will list the currently configured repository server for the scope:

```
http://npm.xgproduct.com:4873
```
