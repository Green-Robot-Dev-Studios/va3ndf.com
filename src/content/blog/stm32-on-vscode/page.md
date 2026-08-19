---
title: STM32 dev setup on VSCode
authors: nick
date: 2025-01-20
description: STM32 dev setup on VSCode
heroImage: "assets/hero.jpg"
---

Please note, this blog post was written to throw down the line rope for fellow students trying to set up VSCode for STM32 development. This applies to folks migrating from STM32CubeIDE to VSCode.

# Toolchain
0. (this is the hardest step) You need an arm toolchain on your machine. 
    
    Basically, if you can run `arm-none-eabi-gcc` as a command in the terminal without error, you're good. 
    
    Otherwise, install it. The easiest way to do this is to install STM32CubeIDE and then just not use it. (STM32CubeIDE will install the toolchain for you) 
    
    Otherwise, google `arm-none-eabi-gcc how to install <your system>`. **Note:** this will bring a slew of issues because the toolchain that ST provides has some modifications built in. Do this at your own risk. I decided not to do this. Good luck if you do.
1. Clone the gitlab repository
2. Open `ece350_start/Debug/makefile`
3. On line **63**: Replace the `C:\Users\nexususer` garbage with the path: `../STM32F401RETX_FLASH.ld`
4. On line **64**: Do the same as above.

Now, `cd` into your `ece350_start/Debug` directory, and do `make all`. This should work without error.

Extra pro tip: add a flash target to your makefile (yay CS247!)

Can look like this: 
```makefile
flash:
    openocd -f board/stm32f4discovery.cfg -c "program ece350_start.elf verify reset exit"
```
Remember to use tabs!

# Flashing
If it does, all that is left to do is program the board:
0. Install `openocd`. Depends on your system. `apt install openocd` or `brew install openocd` for Linux/Mac respectively.
1. Plug the board in 
2. Run `openocd -f board/stm32f4discovery.cfg -c "program ece350_start.elf verify reset exit"`
3. Install `Serial Monitor` into VSCode if you use it (otherwise just use your favorite way to interact with a serial connection)
4. Check the serial output to see if "Hello, World!" is printed repeatedly to the screen!

# Fixing intellisense
Add the following file to your `.vscode/c_cpp_properties.json`

In place of `<gcc path goes here>`, place the output of `which arm-none-eabi-gcc` (on Linux/Mac, for Windows find the path).

It must be the full path.

```json
{
    "version": 4,
    "configurations": [
        {
            "name": "STM32 Board",
            "compilerPath": "<gcc path goes here>",
            "intelliSenseMode": "gcc-arm",
            "includePath": [
                "${workspaceFolder}/**"
            ],
            "defines": [
                "STM32F401xE"
            ]
        }
    ]
}
```

**Note:** Also in this file, we are defining a preprocessor macro called `STM32F401xE`. This fixes a lot of issues. Thanks @zain!

Done!

Ping me on discord @va3ndf if you have questions!
