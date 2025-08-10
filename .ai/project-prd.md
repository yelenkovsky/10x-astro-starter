# PRD: 10xRules.ai

## 1. Concise project description and objectives

The 10xRules.ai project is a modern web application enabling developers to create, generate, and version rules for AI tools such as GitHub Copilot, Cursor, or Windsurf. The application provides an intuitive rule creator (Rule Builder), allowing the construction of hierarchical rule sets. The main goal is to improve the quality of developer collaboration with AI through automation and standardization of the rule definition process.

## 2. Clearly defined user problem

- Developers struggle with inconsistent methods for defining AI rules, which reduces the effectiveness of working with AI-assisted tools.
- The lack of intuitive tools for creating organized, hierarchical rules means that accurate rule definition requires specialized knowledge and experience.
- Users need a solution that enables quick generation of rule sets corresponding to specific technologies and projects.

## 3. Functional requirements

- Rule creator enabling the construction of hierarchical rule sets.
- Generating rules in Markdown format and the ability to copy generated rules to clipboard.
- Ability to download ready-made rule sets from a predefined catalog divided into layers (e.g., Frontend, React, Zustand).
- Generating rules based on dependency files (e.g., package.json, requirements.txt) through analysis of their content.
- User logging and authorization.
- Rule collections enabling the saving of previously created rule sets.

## 4. Project boundaries

- Advanced features for sharing rules between users are not included in MVP.
- Inline editing of already generated rules is not planned.
- Export to formats other than Markdown is not within MVP scope.
- Extended social features go beyond the current functionality scope.

## 5. Precise user stories

US-001: Basic rule generation

- Title: Generating a rule set
- Description: As a user, I want to select elements from a predefined rule catalog to generate a rule set tailored to a specific technology, which will improve collaboration with AI tools.
- Acceptance criteria:
  - User sees a complete rule catalog divided into categories (e.g., Frontend, Backend, libraries).
  - User can select individual rules and receive a preview of the generated set in Markdown format.
  - User can copy generated rules to clipboard.

US-002: Generating rules based on dependency file

- Title: Generating rules from dependency file
- Description: As a user, I want to upload a file (e.g., package.json or requirements.txt) so that the system automatically generates a rule set based on detected project dependencies.
- Acceptance criteria:
  - User can upload a dependency file.
  - System analyzes file content and matches appropriate rules.
  - Generated rule set corresponds to project configuration.

US-003: Rule collections

- Title: Rule collections
- Description: As a user, I want to be able to save and edit rule sets to quickly use proven solutions in different projects.
- Acceptance criteria:
  - User can save the current rule set (US-001) as a collection (name, description, rules).
  - User can update the collection.
  - User can delete the collection.
  - User can restore the collection to a previous version (pending changes).
  - Collection functionality is not available without logging into the system (US-004).

US-004: Secure access and authentication

- Title: Secure access
- Description: As a user, I want to have the ability to register and log into the system in a way that ensures the security of my data.
- Acceptance criteria:
  - Login and registration take place on dedicated pages.
  - Login requires providing email address and password.
  - Registration requires providing email address, password, and password confirmation.
  - User CAN use "ad-hoc" rule creation without logging into the system (US-001).
  - User CANNOT use Collection functionality without logging into the system (US-003).
  - User can log into the system through a button in the upper right corner.
  - User can log out of the system through a button in the upper right corner.
  - We do not use external login services (e.g., Google, GitHub).
  - Password recovery should be possible.

## 6. Success metrics

- Number of generated rule sets and growth in user activity using the creator.
- Average time needed for a user to generate a rule set.
- Adoption rate of the rule generation feature based on dependency files.
- Positive user feedback regarding the intuitiveness and usefulness of the application.
- Number of saved rule versions and frequency of using the version restoration feature.
- Conversion rate for AI intelligent rule suggestion features.
