//=============================================================================
// main.js
//=============================================================================

PluginManager.setup($plugins);

setTimeout(function() {
  SceneManager.run(Scene_Boot);
}, 200);
