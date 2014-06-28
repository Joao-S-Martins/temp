var fs = require('fs');
var util = require('util');
var moment = require('moment');
module.exports = function(env, callback) {

    env.helpers.utils = {
        readJSONSync : readJSONSync,
        __extends: __extends,
        inherits: util.inherits,
        formatDate: getFormattedDate,
        formatTime: getFormattedTime
    }

    /**
     * Synchronously read and try to parse *filename* as json.
     * @param {!string} filename
     * @return {!Object}
     */
    function readJSONSync(filename) {
        var buffer;
        buffer = fs.readFileSync(filename);
        return JSON.parse(buffer.toString());
    }

    /**
     * Create a new object definition extending an existing object definition.
     * @param {!Object} child The object gaining properties
     * @param {!Object} parent The object to copy properties from
     * @return {!Object}
     */
    function __extends(child, parent) {
        var __hasProperty = {}.hasOwnProperty;
        for (var key in parent) {
            if (__hasProperty.call(parent, key)){
                child[key] = parent[key];
            }
        }

        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;

        return child;
    }

    /**
     * Returns standard date formatting.
     * @param {moment=} mmt Exclude for current date.
     * @returns {!string}
     */
    function getFormattedDate(mmt) {
        mmt = mmt || moment();
        return mmt.format('MMMM Do, YYYY');
    }

    /**
     * Returns standard time formatting.
     * @param {moment=} mmt Exclude for current time.
     * @returns {!string}
     */
    function getFormattedTime(mmt) {
        mmt = mmt || moment();
        return (mmt.hour() === 0 && mmt.minute() === 0) ? 'TBD' : mmt.format("h:mm a");
    }

    return callback();
};
