
## Bash
#ID=$(kitty @ launch --window-title npmdev --keep-focus --allow-remote-control --cwd=$PWD npm run dev)

## Fish
#set ID (kitty @ launch --window-title  npmdev --keep-focus --allow-remote-control --cwd=$PWD npm run dev)


kitty @ set-window-title "Main"
kitty @ launch --type tab --tab-title NpmDev --title NpmDev --cwd=/home/kefah/Development/imx/svelte_frontend --keep-focus --allow-remote-control
kitty @ launch --type tab --tab-title Pod --title Pod --cwd=/home/kefah/Development/imx/backend --keep-focus --allow-remote-control
kitty @ send-text --match title:Pod "set -x LOG_LEVEL debug\n"
kitty @ send-text --match title:Pod "./watch.sh\n"
kitty @ send-text --match title:NpmDev "npm run dev\n"

## Close
#
#kitty @ close-window --match title:npmdev
#kitty @ resize-window --match title:npmdev --increment -2 --axis vertical
#
#
# Ctrl+r for fuzzy autocompletion
#Install fisher (fish shell plugin manager)
#curl -sL https://git.io/fisher | source && fisher install jorgebucaran/fisher
#Install fzf pluging
#sudo dnf install fzf
#Install fish fzf plugin using fisher
#fisher install PatrickF1/fzf.fish
#
# Use fish config server
# fish_config
#
# Install fd-find and bat (find and cat alternatives respectivly)
# sudo dnf install bat fd-find
#
#
# List kitty fonts
# kitty + list-fonts --psnames
#
#
# Install as-tree
# sudo dnf install cargo
# cargo install -f --git https://github.com/jez/as-tree
# set -U fish_user_paths $fish_user_paths /home/kefah/.cargo/bin
#
#
# kitty @ set-window-title "Main"
