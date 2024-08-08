# 🧛‍♂️ The Traces of Terror 🧟‍♀️

Welcome to **The Traces of Terror**, my first web development project. This project showcases my passion for both development and the horror genre. 🎃

## 📖 About the Project

The Traces of Terror is an image gallery dedicated to the universe of horror. The idea is to upload images related to horror but originating from works whose original context is not horror. It’s about finding those creepy and spine-chilling moments in unexpected places.

As a huge fan of horror, I wanted to incorporate my passion into this project while also showcasing my skills as a web developer.

## 💻 Technologies Used

### Frontend

- **Astro**: A modern framework that enables building fast and optimized websites.
- **Preact**: A lightweight alternative to React that offers excellent performance.
- **CSS Modules**: For modular and maintainable styling.

### Backend

- **Laravel**: A PHP framework that facilitates building robust and scalable web applications.

## 📸 Features

- **Image Upload**: Users can upload images to the gallery.
- **Categories**: Organize images by type.
- **Responsive Design**: Adaptable design for different screen sizes.

## 📦 Database Setup

Ensure you have a database configured with the following tables and fields:

### Table: `img`
- **id**: Primary key (integer, auto-incrementing)
- **path**: String (URL or path to the image)
- **description**: String (optional, a brief description of the image)
- **title**: String (optional, the title of the image)
- **type**: String (type or category of the image, e.g., cinema, tv, comic, etc.)
- **uploaded**: String (the uploader's identifier, e.g., email or username)
- **created_at**: Timestamp (automatically managed by Laravel)
- **updated_at**: Timestamp (automatically managed by Laravel)
- **deleted_at**: Timestamp (automatically managed by Laravel, for soft deletes)

### Table: `comments`
- **id**: Primary key (integer, auto-incrementing)
- **id_img**: Integer (foreign key referencing `img.id`)
- **content**: Text (the content of the comment)
- **author**: String (the author of the comment)
- **created_at**: Timestamp (automatically managed by Laravel)
- **updated_at**: Timestamp (automatically managed by Laravel)
- **deleted_at**: Timestamp (automatically managed by Laravel, for soft deletes)

## 🚀 Running the Project Locally

To run this project locally, follow these steps:

1. Clone the frontend repository:
    ```bash
    git clone https://github.com/Piterxus/thetracesofterror
    cd <frontend-repo-folder>
    ```

2. Install frontend dependencies using `pnpm` (recommended), `npm`, or `yarn`:
    ```bash
    pnpm install
    # or
    npm install
    # or
    yarn install
    ```

3. Start the frontend development server:
    ```bash
    pnpm run dev
    # or
    npm run dev
    # or
    yarn dev
    ```

4. Clone the backend repository:
    ```bash
    git clone https://github.com/Piterxus/thetracesofterrorback
    cd <backend-repo-folder>
    ```

5. Install backend dependencies:
    ```bash
    composer install
    ```

6. Set up the backend environment:
    - Copy the `.env.example` file to `.env`:
        ```bash
        cp .env.example .env
        ```
    - Update the `.env` file with your database credentials and other necessary configurations.

7. **Important:** If you encounter an `SQLSTATE[HY000] [2002] Connection refused` error, update the session driver in the `.env` file:
    ```bash
    SESSION_DRIVER=file
    ```

8. Generate the application key:
    ```bash
    php artisan key:generate
    ```

9. Run the database migrations:
    ```bash
    php artisan migrate
    ```

10. Create a symbolic link for storage:
    ```bash
    php artisan storage:link
    ```

11. Ensure the `storage` and `bootstrap/cache` directories are writable:
    ```bash
    chmod -R 775 storage
    chmod -R 775 bootstrap/cache
    ```

12. Start the backend development server:
    ```bash
    php artisan serve
    ```


## 🔮 Future Improvements

- **Authentication**: Allow users to register and log in.
- **Comments**: Add a comments section for user interaction.
- **Search**: Implement a search system to quickly find images.
- **Likes**: Enable users to like images.
- **Challenge Developers**: Propose challenges for other developers to contribute and enhance the project.

## 🤝 Contributions

Contributions are welcome! If you have ideas to improve the project, feel free to open an issue or submit a pull request.

## 📬 Contact

If you want to know more about the project or have any questions, you can contact me at:

- **Email**: piterxusdev@gmail.com
- **LinkedIn**: [Pedro Sánchez Lancharro](https://www.linkedin.com/in/pedro-s%C3%A1nchez-lancharro-007136203/)
- **X**: [@Piterxus_Dev](https://x.com/Piterxus_Dev)

## 📄 License

This project is licensed under the MIT License. See the [LICENSE.md](./LICENSE.md) file for details.

## 📜 Attributions

### Fonts

- **Fright**: The font used in the project is "Fright". You can find more information about this font on the author's website [here](https://www.letterhend.com/). The font is licensed under [License](https://www.letterhend.com/licenses/).
