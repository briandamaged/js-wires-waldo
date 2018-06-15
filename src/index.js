
function specFor(thing) {
  return (
    (typeof(thing)==='function')
      ? {create: thing}
      : thing
  );
}


function DoNothing() {

}


function Uninitialized(target, name, {create, wire = DoNothing}) {
  async function uninitialized() {
    target[name] = Creating(name);
    const value = await create.call(target);

    target[name] = Created(value);
    await wire.call(target, value);

    return value
  }

  return uninitialized;
}


function Creating(name) {
  async function creating() {
    throw new Error(`Circular dependency detected: ${name}`);
  }

  return creating;
}

function Created(value) {
  async function created() {
    return value;
  }

  return created;
}



function WW(mapping, target = {}) {
  for(const name in mapping) {
    const spec = specFor(mapping[name]);
    target[name] = Uninitialized(target, name, spec);
  }

  return target;
}



Object.assign(exports, {
  WW, specFor,
});

