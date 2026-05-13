async function fixGlobalSettings() {
    if (game.user.isGM) {
        console.log("Not attempting to set up world settings, as you are not a GM.");
        return;
    }

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

    // module settings below
    if (game.modules.has("pf2e-tokens-characters")) {
        await game.settings.set("pf2e-tokens-characters","galleryAccess", "USER.RolePlayer");
    }

    if (game.modules.has("pf2e-see-simple-scale-statistics")) {
        await game.settings.set("pf2e-see-simple-scale-statistics","toggle-on", true);
    }

    if (game.modules.has("pf2e-toolbelt")) {
        await game.settings.set("pf2e-toolbelt","betterMovement.teleport", false);
        // TODO: ADD KEYBIND
    }

    if (game.modules.has("xdy-pf2e-workbench")) {
        await game.settings.set("xdy-pf2e-workbench","pauseImageNoSpin", true);
        await game.settings.set("xdy-pf2e-workbench","decreaseFrightenedConditionEachTurn", true);
        await game.settings.set("xdy-pf2e-workbench","applyPersistentDamage", true);
        await game.settings.set("xdy-pf2e-workbench","applyPersistentDamageRecoveryRoll", true);
        await game.settings.set("xdy-pf2e-workbench","decreaseFrightenedConditionEachTurn", true);
    }
}

async function fixUserSettings() {
    console.log("Setting up user settings");

    let ui_config = game.settings.get("core","uiConfig");
    ui_config.chatNotifications = "pip";
    ui_config.fade.opacity = 1;
    await game.settings.set("core","uiConfig", ui_config);

    await game.settings.set("core","unconstrainedMovement", true);

    // module settings below
    if (game.modules.has("classic-ui")) {
        await game.settings.set("classic-ui","tabs-on-top", false);
    }

    if (game.modules.has("pf2e-hud")) {
        await game.settings.set("pf2e-hud","time.enabled", false);
        await game.settings.set("pf2e-hud","token.activation", "disabled");
    }

    if (game.modules.has("pf2e-toolbelt")) {
        await game.settings.set("pf2e-toolbelt","betterMovement.history", true);
    }
}

Hooks.once("init", () => {
    const mod = game.modules.get("fvtt_unfckux");
    mod.api = {
        fixGlobalSettings,
        fixUserSettings,
    };

    game.issues._detectUsabilityIssues = () => {};
});

Hooks.on("preCreateScene", (document, data, options, userId) => {
    const levelId = document.levels.sorted[0]._id;
    document.updateSource({padding: 0.0, levels: [{ _id: levelId, background: { color: "#000000"}}]});
});

// cleaner, but doesn't work
//Hooks.on("preCreateScene", (document, data, options, userId) => {
//    let lvls = document.levels;
//    lvls.forEach((item) => {
//        item.background.color = "#000000";
//    });
//    document.updateSource({padding: 0.0, levels: lvls});
//});

// Jank. Unpack when needed.
//Hooks.on("configureCanvasEnvironment", (config) => {
//    config.backgroundColor = 0xFFFFFF;
//});

Hooks.on("preCreateLevel", (document, data, options, userId) => {
    document.updateSource({"background.color": "#000000"});
});
