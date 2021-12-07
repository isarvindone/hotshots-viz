import { respond } from '@sveltejs/kit/ssr';
import root from './generated/root.svelte';
import { set_paths, assets } from './runtime/paths.js';
import { set_prerendering } from './runtime/env.js';
import * as user_hooks from "./hooks.js";

const template = ({ head, body }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<meta name=\"description\" content=\"\" />\n\t\t<link rel=\"icon\" href=\"/favicon.png\" />\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n\t\t" + head + "\n\t</head>\n\t<body>\n\t\t<div id=\"svelte\">" + body + "</div>\n\t</body>\n</html>\n";

let options = null;

const default_settings = { paths: {"base":"","assets":""} };

// allow paths to be overridden in svelte-kit preview
// and in prerendering
export function init(settings = default_settings) {
	set_paths(settings.paths);
	set_prerendering(settings.prerendering || false);

	const hooks = get_hooks(user_hooks);

	options = {
		amp: false,
		dev: false,
		entry: {
			file: assets + "/_app/start-b1939b37.js",
			css: [assets + "/_app/assets/start-464e9d0a.css",assets + "/_app/assets/vendor-85881175.css"],
			js: [assets + "/_app/start-b1939b37.js",assets + "/_app/chunks/vendor-fafd6fe6.js"]
		},
		fetched: undefined,
		floc: false,
		get_component_path: id => assets + "/_app/" + entry_lookup[id],
		get_stack: error => String(error), // for security
		handle_error: (error, request) => {
			hooks.handleError({ error, request });
			error.stack = options.get_stack(error);
		},
		hooks,
		hydrate: true,
		initiator: undefined,
		load_component,
		manifest,
		paths: settings.paths,
		prerender: true,
		read: settings.read,
		root,
		service_worker: null,
		router: true,
		ssr: true,
		target: "#svelte",
		template,
		trailing_slash: "never"
	};
}

// input has already been decoded by decodeURI
// now handle the rest that decodeURIComponent would do
const d = s => s
	.replace(/%23/g, '#')
	.replace(/%3[Bb]/g, ';')
	.replace(/%2[Cc]/g, ',')
	.replace(/%2[Ff]/g, '/')
	.replace(/%3[Ff]/g, '?')
	.replace(/%3[Aa]/g, ':')
	.replace(/%40/g, '@')
	.replace(/%26/g, '&')
	.replace(/%3[Dd]/g, '=')
	.replace(/%2[Bb]/g, '+')
	.replace(/%24/g, '$');

const empty = () => ({});

const manifest = {
	assets: [{"file":".DS_Store","size":6148,"type":null},{"file":".nojekyll","size":0,"type":null},{"file":"Australian Open.png","size":7276,"type":"image/png"},{"file":"Indian Wells.png","size":13065,"type":"image/png"},{"file":"Paris Masters.png","size":21837,"type":"image/png"},{"file":"Qatar Open.png","size":8155,"type":"image/png"},{"file":"Roland Garros.png","size":27274,"type":"image/png"},{"file":"US Open.png","size":14470,"type":"image/png"},{"file":"Wimbledon.png","size":47281,"type":"image/png"},{"file":"World Tour Finals.png","size":23063,"type":"image/png"},{"file":"favicon.png","size":1571,"type":"image/png"},{"file":"tennis.gif","size":671013,"type":"image/gif"}],
	layout: "src/routes/__layout.svelte",
	error: ".svelte-kit/build/components/error.svelte",
	routes: [
		{
						type: 'page',
						pattern: /^\/$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					}
	]
};

// this looks redundant, but the indirection allows us to access
// named imports without triggering Rollup's missing import detection
const get_hooks = hooks => ({
	getSession: hooks.getSession || (() => ({})),
	handle: hooks.handle || (({ request, resolve }) => resolve(request)),
	handleError: hooks.handleError || (({ error }) => console.error(error.stack)),
	externalFetch: hooks.externalFetch || fetch
});

const module_lookup = {
	"src/routes/__layout.svelte": () => import("../../src/routes/__layout.svelte"),".svelte-kit/build/components/error.svelte": () => import("./components/error.svelte"),"src/routes/index.svelte": () => import("../../src/routes/index.svelte")
};

const metadata_lookup = {"src/routes/__layout.svelte":{"entry":"pages/__layout.svelte-c9e9d23e.js","css":["assets/pages/__layout.svelte-cd81ed21.css","assets/vendor-85881175.css"],"js":["pages/__layout.svelte-c9e9d23e.js","chunks/vendor-fafd6fe6.js","chunks/Button-f164f5df.js"],"styles":[]},".svelte-kit/build/components/error.svelte":{"entry":"error.svelte-1ae10420.js","css":["assets/vendor-85881175.css"],"js":["error.svelte-1ae10420.js","chunks/vendor-fafd6fe6.js"],"styles":[]},"src/routes/index.svelte":{"entry":"pages/index.svelte-76285d09.js","css":["assets/pages/index.svelte-795dca26.css","assets/vendor-85881175.css"],"js":["pages/index.svelte-76285d09.js","chunks/vendor-fafd6fe6.js","chunks/Button-f164f5df.js"],"styles":[]}};

async function load_component(file) {
	const { entry, css, js, styles } = metadata_lookup[file];
	return {
		module: await module_lookup[file](),
		entry: assets + "/_app/" + entry,
		css: css.map(dep => assets + "/_app/" + dep),
		js: js.map(dep => assets + "/_app/" + dep),
		styles
	};
}

export function render(request, {
	prerender
} = {}) {
	const host = request.headers["host"];
	return respond({ ...request, host }, options, { prerender });
}