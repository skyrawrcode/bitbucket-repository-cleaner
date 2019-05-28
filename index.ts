import axios, { AxiosInstance } from "axios";
import { Response, Value } from "./models";
import Enquirer from "enquirer";

function createAxiosClient(username: string, password: string): AxiosInstance {
  return axios.create({ auth: { username: username, password: password } });
}

async function getRepositories(client: AxiosInstance): Promise<Value[]> {
  const repositores = await client.get<Response>("https://git.its.uiowa.edu/rest/api/1.0/projects/fbis/repos?limit=300").then(result => {
    const response = result.data;
    console.log(`${response.size} repositories retrieved`);
    return result.data.values;
  });

  return repositores;
}

async function deleteRepository(client: AxiosInstance, repository: Value): Promise<any> {
  const deleteURl = `https://git.its.uiowa.edu/rest/api/1.0/projects/fbis/repos/${repository.slug}`;
  return client.delete(deleteURl).then(
    r => {
      console.log(`Deleted repository ${repository.slug}`);
    },
    err => {
      console.log(`Failed to delete ${repository.slug}`);
    }
  );
}

async function main() {
  var enquirer = new Enquirer();
  // enquirer.register("password", passwordPrompt);
  const { username, password } = (await enquirer.prompt([
    {
      type: "input",
      message: "Username: ",
      name: "username"
    },
    {
      type: "password",
      message: "Password: ",
      name: "password"
    }
  ])) as { username: string; password: string };

  const client = createAxiosClient(username, password);
  const repositories = await getRepositories(client);
  await axios.all(repositories.map(x => deleteRepository(client, x)));
  console.log("Done");
}

main().then(() => {});
