// Define an interface for type safety
interface EnvVariables {
  API_URL: string;
}

// Aggregate environment variables into a constants object
const env: EnvVariables = {
  API_URL: import.meta.env.VITE_API_URL || "",
};

// Optional: Freeze the object to prevent accidental modifications
Object.freeze(env);

export default env;
