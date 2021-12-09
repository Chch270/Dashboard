# B-DEV-500-PAR-5-1-dashboard-charlie-chou

# Presentation

The goal of this project is to create a customisable dashboard with our own feature.

We decided to use postgresql for the db, nestJs for the back and reactJS for the front.

# Installation
<p align="center">
  <a href="https://www.postgresql.org/download/">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png" width="30%" width="30px">
  </a>
</p>
<p align="center">
  <a href="https://docs.nestjs.com/">
    <img src="https://d33wubrfki0l68.cloudfront.net/e937e774cbbe23635999615ad5d7732decad182a/26072/logo-small.ede75a6b.svg" width="30%" width="30px">
  </a>
</p>
<p align="center">
  <a href="https://fr.reactjs.org/tutorial/tutorial.html">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png" width="30%" width="30px">
  </a>
</p>

# Lunching
to lunch the app:

```bash
docker-compose build && docker-compose up
```

to stop the app:

```bash
docker-compose down
```

to clear database data:

```bash
docker-compose down --volumes
```

to generte back-end doc (run from api folder):

```bash
npx @compodoc/compodoc -p tsconfig.json -s
```

<h1>Previews</h1>
<details>
    <summary>Login</summary>
    <img src="assets/login.png">
</details>
<details>
    <summary>Register</summary>
    <img src="assets/register.png">
</details>
<details>
    <summary>Home</summary>
    <img src="assets/home.png">
</details>
<details>
    <summary>Parameters</summary>
    <img src="assets/parameters.png">
</details>
<br>

## Contributors

- Arthur Fouquet [![github-link][github-logo]](https://github.com/arthur-fouquet)
- Charlie Chou [![github-link][github-logo]](https://github.com/Chch270)


[Github-logo]: https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white