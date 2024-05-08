import * as postgres from "https://deno.land/x/postgres@v0.19.3/mod.ts";
import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";

const env = await load();

export const connect = async () => {
    // Create a database pool with three connections that are lazily established
    // since this is local postgres instance it is OK to hardcode values
    // except password for demosntration purpose
    const poolSize = parseInt(env["POSTGRES_PASSWORD_POOL_SIZE"]!);
    const lazy = true;
    const pool = new postgres.Pool({
        database: 'postgres',
        hostname: 'localhost',
        password: env['POSTGRES_PASSWORD']!,
        port: 5432,
        user: 'postgres',
    }, poolSize, lazy);

    const connection = await pool.connect();
    return connection;
};

const executeSqlFile = async (client: postgres.PoolClient, sqlFilePath: string): Promise<void> => {
    try {
        const sqlCommands = await Deno.readTextFile(sqlFilePath);

        // Split SQL commands by semicolon and execute each command
        const commands = sqlCommands.split(";").map((cmd) => cmd.trim());

        for (const command of commands) {
            if (command) {
                await client.queryArray(command);
            }
        }

        console.log(`SQL file ${sqlFilePath} executed successfully.`);
    } catch (error) {
        console.error("Error executing SQL file:", error);
    }
}

export const initializeDB = async () => {
    using client = await connect();
    // data definition
    await executeSqlFile(client, './sql/ddl.sql')
    // data modification
    await executeSqlFile(client, './sql/dml.sql')
}
