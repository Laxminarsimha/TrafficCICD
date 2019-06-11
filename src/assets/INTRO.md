# Core Component Library

<table cellpadding="5">
<tr>
    <td align="right">Project Repo:</td>
    <td><a href="https://bitbucket.org/jimvose/common-component-lib">
    https://bitbucket.org/jimvose/common-component-lib</a></td>
</tr>
<tr>
    <td align="right">NPM Package:</td>
    <td><a href="http://localhost:4873/#/detail/@imaginecom/common-component-lib">@imaginecom/common-component-lib</a></td>
</tr>
</table>

The Common Core Components NPM library is an NPM library that contains Angular components that are common across many Imagine Communiations web applications.

### Setup NPM Repository

In order to install this library, the Imagine Communications NPM repository must be associated with the `@imaginecom` NPM scope.

Use the following command once in a development environment to ensure the scope is properly set:

```
npm config set @imaginecom:registry=http://localhost:4873

```

To check if the `@imaginecom` scope is properly set, use:

```
npm config get @imaginecom:registry
```

Which will list the currently configured repository server for the scope:

```
http://localhost:4873

```

### Installation

Once NPM is configured with to use the Imagine NPM repository for packages scoped with `@imaginecom`, the package can be installed into a project with:

```
npm install --save-dev @imaginecom/common-component-lib
```

Then components out of the library can be imported and used:

```
import {  } from '@imaginecom/common-component-lib';
```
