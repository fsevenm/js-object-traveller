function investigate(key, filter, object) {
  const c1 = filter[key];
  const c2 = object[key];
  if (!c2) return false;
  if (c1 instanceof Object) {
    for (const key in c1) {
      if (!investigate(key, c1, c2)) {
        return false;
      }
    }
    return true;
  } else {
    if (c1 !== c2) return false;
    return true;
  }
}

module.exports = {
  travel: function travel(object, ...args) {
    let item = args[0];
    let originalItem = item;
    if (item instanceof Object && object instanceof Array) {
      // assuming that 'object' is an array in this context
      item = object.findIndex((i) => {
        for (const key in item) {
          if (!investigate(key, item, i)) return false;
        }
        return true;
      });
      if (item === -1) item = -2;
    }

    if (object instanceof Array && item === -1) {
      const nextArgs = args.filter((i) => i !== item);
      for (const [i, v] of object.entries()) {
        const res = travel(object, i, ...nextArgs);
        if (res !== "") {
          return res;
        }
      }
      return "";
    } else {
      if (object && !(item instanceof Array) && object.hasOwnProperty(item)) {
        const curatedArgs = args.filter((i) => i !== originalItem);
        if (curatedArgs.length > 0) {
          return travel(object[item], ...curatedArgs);
        } else {
          return object[item];
        }
      } else {
        if (item instanceof Array) {
          let retData = {};
          for (const key of item) {
            if (key instanceof Object) {
              retData[Object.keys(key)[0]] = travel(
                object,
                ...Object.values(key)[0]
              );
            } else {
              retData[key] = object[key];
            }
          }
          return retData;
        }
        return "";
      }
    }
  },
  travelOr: function travel(alternate, object, ...args) {
    let item = args[0];
    let originalItem = item;
    if (item instanceof Object && object instanceof Array) {
      // assuming that 'object' is an array in this context
      item = object.findIndex((i) => {
        for (const key in item) {
          if (!investigate(key, item, i)) return false;
        }
        return true;
      });
      if (item === -1) item = -2;
    }
    if (object instanceof Array && item === -1) {
      const nextArgs = args.filter((i) => i !== item);
      for (const [i, v] of object.entries()) {
        const res = travel(alternate, object, i, ...nextArgs);
        if (res !== alternate) {
          return res;
        }
      }
      return alternate;
    } else {
      if (
        object &&
        !(item instanceof Array) &&
        Object.prototype.hasOwnProperty.call(object, item)
      ) {
        const curatedArgs = args.filter((i) => i !== originalItem);
        if (curatedArgs.length > 0) {
          return travel(alternate, object[item], ...curatedArgs);
        } else {
          return object[item];
        }
      } else {
        if (item instanceof Array) {
          let retData = {};
          for (const key of item) {
            if (key instanceof Object) {
              retData[Object.keys(key)[0]] = travel(
                alternate,
                object,
                ...Object.values(key)[0]
              );
            } else {
              retData[key] = object[key];
            }
          }
          return retData;
        }
        return alternate;
      }
    }
  },
};