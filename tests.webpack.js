var context = require.context('./tests/components', true, /-test\.js$/);
context.keys().forEach(context);