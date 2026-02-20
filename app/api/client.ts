import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import type { paths } from "./types";
import { Config } from "~/config";

const fetchClient = createFetchClient<paths>({
  baseUrl: Config.ApiUrl,
});

export const $api = createClient(fetchClient);
