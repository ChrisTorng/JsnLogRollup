import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
//import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'index.ts',
  //external: [ 'jsnlog' ],
  output: [
    {
      file: 'index.umd.js',
      format: 'umd',
      //globals: { 'jsnlog': 'jsnlog' }
    },
    {
      file: 'index.es.js',
      format: 'es',
      //globals: { 'jsnlog': 'jsnlog' }
    }
  ],
  plugins: [
    typescript(),
    nodeResolve(),
    //commonjs(),
  ]
};