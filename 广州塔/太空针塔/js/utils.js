SN.Utils = {
    flatten: function(data, set) {
        set = set || [];

        switch(typeof data) {
            case "object":
                for (var key in data) {
                    SN.Utils.flatten(data[key], set);
                }
                return set;

            default:
                set.push(data);
                return set;
        }
    },

    extendClass: function(TargetClass, ParentClass) {
        TargetClass.prototype = new ParentClass();
        TargetClass.prototype.constructor = TargetClass;
    },

    adjustLineBreaks: function(message) {
        return message
                .replace(/[\s\t]+/g, " ")
                .replace(/<br>\s*/g, "\n")
                .trim();
    }
}