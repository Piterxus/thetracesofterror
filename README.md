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

Ensure you have a database named images with the following fields:

- **id**: Primary key (integer, auto-incrementing)
- **path**: String (URL or path to the image)
- **description**: String (optional, a brief description of the image)
- **title**: String (optional, the title of the image)
- **type**: String (type or category of the image, e.g., cinema, tv, comic, etc.)
- **uploaded**: String (the uploader's identifier, e.g., email or username)

### Laravel Specific Fields

If you are using Laravel, make sure to include the following additional fields in the `images` table:

- **timestamps**: Laravel default fields for tracking created and updated timestamps.
- **softDeletes**: Laravel default field for implementing soft deletes (optional, used to mark records as deleted without actually removing them from the database).

The `timestamps` and `softDeletes` fields will be automatically managed by Laravel, so you don’t need to manually handle them in your application logic.


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
