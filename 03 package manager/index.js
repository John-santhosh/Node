// to add a dev dependency npm i --save-dev || -D
// dev dependency are packages are needed only for developing and testing

// this is an example for importing external packages from npm
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

console.log("testing");
console.log(format(new Date(), "yyyy/MM/dd\tHH:mm:ss"));

console.log(uuid());

// semantic versioning numbers
// "uuid": "^9.2.1"
// -the 1st number(9) is major version
// -The 2nd number(0) is a minor version
// -The 3rd number is (1) is a patch

//the ^ denotes that the npm can update the minor version and patch and do not update the major version because the major version has some breaking changes that could break your application.

// if there is nothing in front of the number it means we specifying a specific version to this project.

// ~ tells that only update the patch version but don't update the minor version

// * denotes that always use the updated and latest version although it might not always safe to use this

// we can always use/install a specific a version using the 'npm i package@specific_version'

// we can use 'npm update' for minor or patch to an package => npm will check for any updated available in your package.json

// to uninstall an package
// npm rm package_name <-D>(this -D is only for dev dependency)
