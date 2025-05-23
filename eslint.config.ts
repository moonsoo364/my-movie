import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import pluginVitest from '@vitest/eslint-plugin'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import eslintConfigPrettier from 'eslint-config-prettier'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,ts,mts,tsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  // Vue의 엄격한 룰 적용
  pluginVue.configs['flat/strongly-recommended'],

  // TypeScript의 recommended 룰 적용
  vueTsConfigs.strict,

  // Prettier와 충돌 방지 및 코드 포맷 강제
  eslintConfigPrettier,
  // 테스트 파일에 대한 vitest 룰
  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },

  skipFormatting,

  // 추가로 직접 룰을 더 엄격하게 지정할 수 있습니다.
  {
    rules: {
      'no-console': 'error',
      'no-debugger': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'eqeqeq': ['error', 'always'],
      'curly': 'error',
      'prettier/prettier': 'error',
      'import/order': ['error', { 'alphabetize': { order: 'asc' } }],
      // 필요에 따라 더 추가
    },
  },
)
