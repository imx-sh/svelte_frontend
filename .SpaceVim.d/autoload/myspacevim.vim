func! myspacevim#before() abort
  let g:neomake_javascript_eslint_exe = $HOME . '/.node/bin/eslint'
  let g:python_host_prog = '/usr/bin/python3'
  let g:startify_custom_header = []
  set wrap
endf

"function! myspacevim#before() abort
  " function  let g:neomake_javascript_eslint_exe = $PWD .'/node_modules/.bin/eslint'
  " let g:neomake_javascript_eslint_exe = '/home/kefah/Development/imx/svelte_frontend/node_modules/.bin/eslint'
"  set wrap
"endfunction
