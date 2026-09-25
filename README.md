## reacttypescriptcleanapiclientapp

## what is this project?

this project name is reacttypescriptcleanapiclientapp,

this project code provides react/typescript UI implementation of basic CURD operation for book and person models,

this project uses axios library to make http call to external API for CURD operation,

## important note

This project code base is only intended to learn react/typescript programming and used for educational purposes.

## Technology Stack

- **React**: 19.0.0
- **TypeScript**: 5.9.3
- **Build Tool**: Vite 6.x (migrated from Create React App)
- **State Management**: @tanstack/react-query (React Query)
- **HTTP Client**: axios
- **Routing**: react-router-dom
- **Icons**: react-icons

## Commands

### Development
```bash
npm install          # Install dependencies
npm start            # Start dev server on http://localhost:4000
npm run build        # Create production build in dist/
npm run preview      # Preview production build locally
npm test             # Run tests
```

### Docker
```bash
docker-dev-start     # Use this command for docker localhost test
docker-prod-build    # Use this command to run docker container in a hosting machine
```

## Migration Notes

This project has been migrated from Create React App (CRA) to Vite for better performance and React 19 support. See [VITE_MIGRATION.md](./VITE_MIGRATION.md) for complete migration details including:

- Environment variable changes (REACT_APP_* → VITE_*)
- Build output location (build/ → dist/)
- Performance improvements
- Troubleshooting guide


