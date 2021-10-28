const TODO_REQUIRED_KEYS = ['createdBy', 'title', 'task'];

const USER_REGEXP = /^[a-záéíóúñA-ZÁÉÍÓÚÑ]{3,}$/;
const TITLE_REGEXP = /^[ a-záéíóúñA-ZÁÉÍÓÚÑ0-9]{3,50}$/;
const TASK_REGEXP = /^[ a-záéíóúñA-ZÁÉÍÓÚÑ,&0-9]{3,400}$/;

const REG_EXPRESSIONS = [USER_REGEXP, TITLE_REGEXP, TASK_REGEXP];

export const verifyTodoPayload = (req, res, next) => {
  const { body } = req;
  const isBodyValid = Boolean(body);
  if (!isBodyValid) {
    res.status(400).json({ error: 'empty body' });
    return;
  }

  const hasRequiredKeys = TODO_REQUIRED_KEYS.every((key) =>
    Object.keys(body).includes(key)
  );

  if (!hasRequiredKeys) {
    const missingKeys = TODO_REQUIRED_KEYS.filter(
      (key) => !Object.keys(body).includes(key)
    );

    res.status(400).json({
      error: `Missing keys: [${missingKeys.join(', ')}]`,
      missingKeys,
    });
    return;
  }

  const { user, title, task } = body;
  const testSubjects = [user, title, task];
  const matchesRegex = testSubjects.every((value, index) =>
    REG_EXPRESSIONS[index].test(value)
  );

  if (!matchesRegex) {
    const invalidKeys = testSubjects
      .map((value, index) => {
        return {
          isValid: REG_EXPRESSIONS[index].test(value),
          key: TODO_REQUIRED_KEYS[index],
        };
      })
      .filter((testSubject) => !testSubject.isValid)
      .map((testSubject) => testSubject.key);

    res.status(400).json({
      error: `Invalid values: [${invalidKeys.join(', ')}]`,
      invalidKeys,
    });
    return;
  }

  next();
};
