# steam-screensaver-unlocker

## The problem

My Gnome desktop auto locks the screen when I'm away, and when I want to play a game,
 using In-Home streaming, I need to unlock it, but I hate go upstairs to do it.

## The solution

Run this daemon on your Gnome desktop. Requires `gnome-screensaver`.

## Install

```bash
git clone https://github.com/piffall/steam-screensaver-unlocker.git
cd steam-screensaver-unlocker
sudo npm install -g
```

## Run

```bash
steam-screensaver-unlocker
```

I recomend you to launch at start up. To do it, simply copy the desktop file
into your autostart config path.

```bash
cp steam-screensaver-unlocker.desktop ~/.config/autostart/
```


## Donations (BTC)
*Please consider support the project donating to the Bitcoin address below:*

17q6RT31yEJAptrUzXhwEq5iPwEguEFFBG
