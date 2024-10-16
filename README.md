This is template for make website using Nextjs 14 App Router Integrated with :

- Firebase
- ShadcnUI
- Tailwind with Prettier
- HonoJS

## Test mode

rules_version = '2';

service cloud.firestore {
match /databases/{database}/documents {
match /{document=\*\*} {
allow read, write: if
request.time < timestamp.date(2024, 11, 14);
}
}
}

## Production mode

rules_version = '2';

service cloud.firestore {
match /databases/{database}/documents {
match /{document=\*\*} {
allow read, write: if false;
}
}
}
