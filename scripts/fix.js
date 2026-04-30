async function fixGlobalSettings() {
    if (game.user.role === 4) {
        console.log("Setting up world settings");

        let perms = game.settings.get("core", "permissions");
        perms.SHOW_CURSOR = [];
        await game.settings.set("core", "permissions", perms);

        let overrides = game.settings.get("core","prototypeTokenOverrides");
        overrides.base.displayBars = 20;
        overrides.base.displayName = 30;
        overrides.base.turnMarker.animation = null;
        await game.settings.set("core","prototypeTokenOverrides", overrides);

        let combat_tracker = game.settings.get("core","combatTrackerConfig");
        combat_tracker.turnMarker.animation = null;
        await game.settings.set("core","combatTrackerConfig", combat_tracker);
        
        await game.settings.set("core","tokenAutoRotate", false);

        await game.settings.set("core","tokenDragPreview", false);
    }
}

async function fixUserSettings() {
    console.log("Setting up user settings");

    let ui_config = game.settings.get("core","uiConfig");
    ui_config.chatNotifications = "pip";
    ui_config.fade.opacity = 1;
    await game.settings.set("core","uiConfig", ui_config);

    await game.settings.set("core","unconstrainedMovement", true);
}

Hooks.once("ready", () => {fixGlobalSettings()});
Hooks.once("ready", () => {fixUserSettings()});