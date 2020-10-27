# js-object-traveller

Safely play with your js object.

## Install

```sh
npm -i js-object-traveller
```

## Usage

### Simple usage
```js
import { travel } from "js-object-traveller";

travel(person, "name");  // return empty string if no prop "name"
```

### Simple usage with custom fallback
```js
import { travelOr } from "js-object-traveller"

travelOr("No name", person, "name");  // return "No name" if no prop "name"
```

## Contributing

Feel free to contribute whatever related to this project.


## License

MIT © Ayub Aswad
