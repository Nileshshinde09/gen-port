import { GraphQLScalarType, Kind } from "graphql";


// Custom Date Scalar for handling date serialization
const DateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Custom date scalar to handle date format with microseconds and timezone offset.',
  
  // Serialize function will convert the Date object to a valid string in your custom format.
  serialize(value) {
    if (value instanceof Date && !isNaN(value)) {
      return value.toISOString(); // Converts Date object to a standard ISO 8601 format.
    }

    // If value is a string, attempt to parse it into a valid Date.
    if (typeof value === 'string') {
      const parsedDate = new Date(value);
      if (!isNaN(parsedDate)) {
        return parsedDate.toISOString(); // Converts string to Date object and then to ISO format.
      }
    }

    throw new Error('Invalid Date format');
  },

  // Parse the incoming value from the GraphQL query (string or integer) into a JavaScript Date object.
  parseValue(value) {
    if (typeof value === 'string') {
      // Handle custom date format
      const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}\.\d{3}[+-]\d{2}:\d{2}$/;
      
      if (regex.test(value)) {
        // This matches the custom format like '2024-05-11T09:54:58.364104.000+00:00'
        return new Date(value.replace(/\.\d{3}$/, '')); // Remove microseconds for compatibility with JavaScript Date
      } else {
        throw new Error('Invalid Date format');
      }
    }
    throw new Error('Invalid Date format');
  },

  // Parse the literal value from the GraphQL query (AST node).
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      // Handle custom date format in literal
      const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}\.\d{3}[+-]\d{2}:\d{2}$/;
      
      if (regex.test(ast.value)) {
        return new Date(ast.value.replace(/\.\d{3}$/, '')); // Remove microseconds for compatibility with JavaScript Date
      }
    }
    return null;
  },
});

export default DateScalar;