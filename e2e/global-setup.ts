import { LANDING } from "./helpers";

async function assertUp(name: string, url: string) {
  const response = await fetch(url, { redirect: "manual" }).catch(() => null);
  if (!response) {
    throw new Error(`${name} is not running at ${url}`);
  }
}

export default async function globalSetup() {
  await assertUp("Landing", LANDING);
}
