const fs = require('fs');
const path = require('path');

function processor(testRunResult) {
  const fileWritten = path.resolve(__dirname, 'public/unit-test-results.json');
  const componentRegex = /<(?<ComponentName>.*)\/>/;

  const finalResults = {};

  testRunResult.testResults.forEach((parentResult) => {
    let describeTitle;

    for (const ancestorTitle of parentResult.testResults[0].ancestorTitles) {
      const match = componentRegex.exec(ancestorTitle);

      if (match) {
        describeTitle = match.groups.ComponentName;
        break;
      }
    }

    if (describeTitle) {
      const tests = parentResult.testResults.map((result) => ({
        testName: result.title,
        passed: result.status === 'passed',
      }));

      const result = {
        numFailingTests: parentResult.numFailingTests,
        numPassingTests: parentResult.numPassingTests,
        tests,
      };

      finalResults[describeTitle] = result;
    }
  });

  fs.writeFileSync(fileWritten, JSON.stringify(finalResults));

  return testRunResult;
}

module.exports = processor;
