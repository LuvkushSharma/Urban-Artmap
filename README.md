# Crowdsourced Urban Art Map

![Urban Art](https://res.cloudinary.com/dx2vel6vy/image/upload/v1721455274/nhj7wc5hrqxlxfpr1lko.jpg)

Urban art, including graffiti, murals, and street installations, often goes undocumented and underappreciated due to its ephemeral nature and lack of visibility. This project aims to create a platform where urban art enthusiasts can document, share, and explore urban artworks from around the world, preserving them digitally for a global audience.

## Objective

The objective of this project is to develop a crowdsourced urban art map that allows users to document and share urban art, making it accessible to everyone. It aims to create a community-driven platform that celebrates and preserves urban art, providing a comprehensive and interactive experience for users to discover and engage with street art.

## Key Features

- **User Profiles**: Users can create profiles, upload photos of urban art, and provide descriptions.
- **Geotagging**: Artworks can be geotagged to specific locations, allowing users to explore urban art on an interactive map.
- **Art Descriptions**: Users can add details about the artwork, including the artist, date, and story behind the piece.
- **Community Voting**: Users can vote on their favorite artworks, helping to highlight popular and significant pieces.
- **Social Sharing**: Users can share urban art discoveries on social media platforms.
- **Artist Profiles**: Artists can claim their work, create profiles, and interact with the community.
- **Top 3 Artworks**: Top 3 most voted artworks will be shown.
- **Most Recently Visited Artworks**: Displays the 3 most recently visited artworks.
- **Two-Factor Authentication (2FA)**: Enhances account security.
- **Interactive UI with Aceternity**: Provides a more engaging user experience.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Authentication**: JWT, Nodemailer and Brevo for 2FA
- **Cloud Storage**: Cloudinary
- **Maps**: Leaflet library

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Express.js
- React.js

### Installation

1. Clone the repository
    ```bash
    git clone https://github.com/LuvkushSharma/Urban-Artmap.git
    cd Frontend
    ```

2. Install dependencies
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    PORT = 4001
    NODE_ENV = development

    DATABASE = ...
    JWT_SECRET = ...
    JWT_EXPIRES_IN = 90d
    JWT_COOKIE_EXPIRES_IN=90

    EMAIL_USERNAME = ...
    EMAIL_PASSWORD = ...
    EMAIL_HOST = sandbox.smtp.mailtrap.io
    EMAIL_PORT = 25

    EMAIL_FROM = ...

    BREVO_USER= ...
    BREVO_PASSWORD= ...
    BREVO_HOST= ...
    BREVO_PORT=587
    ```

4. Run the development server
    ```bash
    npm run dev -----> Running Frontend
    npm run start:prod -----> Running Backend
    ```

### Usage

- **Register/Login**: Create a new account or log in to an existing account.
- **Upload Art**: Upload photos of urban artworks, add descriptions, and geotag the location.
- **Explore Map**: Browse and explore geotagged artworks on the interactive map.
- **Vote and Share**: Vote on your favorite artworks and share them on social media.

## Contributing

We welcome contributions to the Crowdsourced Urban Art Map project! Here’s how you can help:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes and commit them (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, feel free to contact:

- **Luvkush Sharma** - [Email](mailto:luvkush.sharma_cs.h21@gla.ac.in)

---

*Thank you for contributing to the preservation and celebration of urban art!*
