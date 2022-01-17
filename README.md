<h1 align="center" style="font-weight:">Flash Cards</h1>

<h3 align="right" style="font-weight:">
  Try <a href="https://zif1r.github.io/flash-cards-new/">Live Demo</a>
</h3>

<h1 style="font-size: 27px">Short review of project</h1>

<h2 style="text-decoration: underline">Main facilities</h2>

- Registration/Authorization
- Changing app language (EN/RU/JP)
- Changing profile data
- Adding folders/cards/categories and editing it
- Training by cards
- Checking memorized and not memorized cards
- Setting app theme/cards review
- Export/Import of cards

<h2 style="text-decoration: underline">Technological stack</h2>

- Vue.js & Vuex & Vue Router
- Firebase (database)
- JavaScript
- Sass

<h1>Screenshots</h1>

### Profile page
<img src="./readme_src/profile.png" />

<br>

### Folders page
<img src="./readme_src/folders.png" />

<br>

### Settings page
<img src="./readme_src/settings.png" />

<br>

### Cards page
<img src="./readme_src/cards.png" />

<br>

### Review pop-up
<img src="./readme_src/review.png" />

<br>

<h1>Notes of usage</h1>

### Import-file should be in JSON format and have such structure:

```json
[
  {
    "term": "Example term1",
    "definition": "Пример перевода",
    "examples": "Examples of usage"
  },
  {
    "term": "Example term2",
    "definition": "Пример перевода",
    "examples": "Examples of usage"
  },
  ...
]
```

<h1>Project setup</h1>

### Download dependencies
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
