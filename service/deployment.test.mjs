import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("the read-only presentation container receives bounded temporary storage", async () => {
  const deployment = await readFile(
    new URL("../deploy/openshift/base/presentation-deployment.yaml", import.meta.url),
    "utf8",
  );

  assert.match(deployment, /readOnlyRootFilesystem:\s*true/);
  assert.match(deployment, /name:\s*nginx-temporary-files/);
  assert.match(deployment, /mountPath:\s*\/tmp/);
  assert.match(deployment, /emptyDir:\s*\{\}/);
});
