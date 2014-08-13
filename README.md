# osx-volume

Get and set the volume of your Mac

## Installation
### [npm](http://npmjs.org)

    $ npm install osx-volume

## API
    var volume = require('osx-volume')

### volume.get(callback)
    volume.get(function(value, [error]) {
        console.log(value)  //0...100
    })

### volume.set(vaule, [callback])
    volume.set(50) {
        //volume set to 50%
    })

    volume.set(69, function(error) {
        console.log('an error occured:', error)
    })

### volume.mute([callback])
    volume.mute()

    volume.mute(function(error) {
        //...
    })

### volume.unmute([callback])
    volume.unmute()

    volume.unmute(function(error) {
        //...
    })

### volume.levels(callback)
    volume.levels(function(obj, [error]) {
        console.log(obj)
        // { out: [0..100],
        //   in: [0..100]},
        //   alert: [0..100],
        //   muted: [true|false]
        // }
    })

## License

MIT
