module.exports = [
  {
    // Directorios y archivos a ignorar por ESLint
    ignores: ['dist', 'node_modules', '**/*.min.js'],
  },
  {
    // Aplica a todos los archivos TypeScript del proyecto
    files: ['**/*.ts'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        sourceType: 'module',
      },
    },
    plugins: {
      // Reglas específicas para Angular
      '@angular-eslint': require('@angular-eslint/eslint-plugin'),
      // Reglas y utilidades de TypeScript
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      // Integra Prettier como regla de ESLint para formateo consistente
      prettier: require('eslint-plugin-prettier'),
    },
    rules: {
      // Enforce formateo de Prettier como errores (ajusta fin de línea automáticamente)
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      // Desactiva no-undef porque TypeScript ya gestiona tipos y variables
      'no-undef': 'off',
      // Advierte sobre variables no usadas; permite prefijo _ para ignorarlas
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // Desactiva prefer-inject: útil cuando usas constructors o patrones alternativos
      '@angular-eslint/prefer-inject': 'off',
      // Permite any en casos puntuales; útil durante migraciones o APIs dinámicas
      '@typescript-eslint/no-explicit-any': 'off',
      // Enforce selector de directiva: atributo, prefijo app, estilo camelCase
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],
      // Enforce selector de componente: elemento, prefijo app, estilo kebab-case
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],
    },
  },
  {
    // Reglas aplicadas a templates HTML de Angular
    files: ['**/*.html'],
    languageOptions: {
      parser: require('@angular-eslint/template-parser'),
    },
    plugins: {
      // Reglas de plantillas de Angular
      '@angular-eslint/template': require('@angular-eslint/eslint-plugin-template'),
      // Integración de Prettier también para HTML si aplica
      prettier: require('eslint-plugin-prettier'),
    },
    rules: {
      // Puedes añadir reglas de templates si las necesitas más adelante
    },
  },
];
