/**
 * @name Test
 * @version 1.2.0
 * @description Test plugin
 * @author Me
 * @source https://github.com/Midnighter32/TestPlugin/blob/main/Test.plugin.js
 * @updateUrl https://raw.githubusercontent.com/Midnighter32/TestPlugin/main/Test.plugin.js
 * @authorLink https://github.com/Midnighter32
 */

module.exports = (_ => {
	const config = {
		"info": {
			"name": "Test",
			"author": "Me",
			"version": "1.2.0",
			"description": "Test plugin"
		},
		"rawUrl": "https://raw.githubusercontent.com/Midnighter32/TestPlugin/main/Test.plugin.js",
		"changeLog": {
			"added": {
				"Added": "Disable useless text input buttons"
			}
		}
	};
	
	return (window.Lightcord || window.LightCord) ? class {
		getName () {return config.info.name;}
		getAuthor () {return config.info.author;}
		getVersion () {return config.info.version;}
		getDescription () {return "Do not use LightCord!";}
		load () {BdApi.alert("Attention!", "By using LightCord you are risking your Discord Account, due to using a 3rd Party Client. Switch to an official Discord Client (https://discord.com/) with the proper BD Injection (https://betterdiscord.app/)");}
		start() {}
		stop() {}
	} : !window.BDFDB_Global || (!window.BDFDB_Global.loaded && !window.BDFDB_Global.started) ? class {
        getName () {return config.info.name;}
		getAuthor () {return config.info.author;}
		getVersion () {return config.info.version;}
        getDescription () {return `The Library Plugin needed for ${config.info.name} is missing. Open the Plugin Settings to download it. \n\n${config.info.description}`;}

        downloadLibrary () {
			require("request").get("https://mwittrien.github.io/BetterDiscordAddons/Library/0BDFDB.plugin.js", (e, r, b) => {
				if (!e && b && r.statusCode == 200) require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0BDFDB.plugin.js"), b, _ => BdApi.showToast("Finished downloading BDFDB Library", {type: "success"}));
				else BdApi.alert("Error", "Could not download BDFDB Library Plugin. Try again later or download it manually from GitHub: https://mwittrien.github.io/downloader/?library");
			});
		}

        load () {
			if (!window.BDFDB_Global || !Array.isArray(window.BDFDB_Global.pluginQueue)) window.BDFDB_Global = Object.assign({}, window.BDFDB_Global, {pluginQueue: []});
			if (!window.BDFDB_Global.downloadModal) {
				window.BDFDB_Global.downloadModal = true;
				BdApi.showConfirmationModal("Library Missing", `The Library Plugin needed for ${config.info.name} is missing. Please click "Download Now" to install it.`, {
					confirmText: "Download Now",
					cancelText: "Cancel",
					onCancel: _ => {delete window.BDFDB_Global.downloadModal;},
					onConfirm: _ => {
						delete window.BDFDB_Global.downloadModal;
						this.downloadLibrary();
					}
				});
			}
			if (!window.BDFDB_Global.pluginQueue.includes(config.info.name)) window.BDFDB_Global.pluginQueue.push(config.info.name);
		}
        start () {this.load();}
		stop () {}
        getSettingsPanel () {
			let template = document.createElement("template");
			template.innerHTML = `<div style="color: var(--header-primary); font-size: 16px; font-weight: 300; white-space: pre; line-height: 22px;">The Library Plugin needed for ${config.info.name} is missing.\nPlease click <a style="font-weight: 500;">Download Now</a> to install it.</div>`;
			template.content.firstElementChild.querySelector("a").addEventListener("click", this.downloadLibrary);
			return template.content.firstElementChild;
		}
    } : (([Plugin, BDFDB]) => {
	var _this;

        const reverseIconGeneral = `<svg name="Reverse" width="24" height="24" viewBox="0 0 24 24"><mask/><path fill="currentColor" mask="url(#reverseIconMask)" d="M15.213899576978026,5.528789188008155 H1.7844101074292364 c-0.494804316526672,0 -0.9493673193122384,0.33351936890095385 -1.0434768464823498,0.8190925598325953 c-0.12683806337067172,0.653012222287381 0.37236202724887196,1.2269404724857373 1.0032355327412454,1.2269404724857373 h13.469730783289906 c0.094109527170111,0 0.17051607322074858,-0.07636658446797527 0.17051607322074858,-0.17051607322074858 v-1.705040847459499 C15.384415650198775,5.605195734058793 15.30800910414814,5.528789188008155 15.213899576978026,5.528789188008155 z M22.492624269528633,6.146313138285018 L16.983178140315623,1.4844435430262761 c-0.12585016623931355,-0.10638163223544186 -0.30215959408049886,-0.130518641230038 -0.45219643394197007,-0.0610378272723428 c-0.1495898582134225,0.06992779560574339 -0.24539292477839372,0.21951765381916616 -0.24539292477839372,0.38480153434183206 v9.32368952588992 c0,0.16528388052266627 0.09580306656497084,0.31487373873608854 0.24539292477839372,0.3844042173213451 c0.05721365095015374,0.02671956962776275 0.11780449657444832,0.03943371428335246 0.17844500682630396,0.03943371428335246 c0.09833596257057677,0 0.1957779618450571,-0.0343182576445801 0.27380109174322664,-0.10002455990764712 l5.509446129213013,-4.661869595258741 c0.09535608491692274,-0.08095334292426258 0.15003683986147076,-0.19920482114675928 0.15003683986147076,-0.32376370706948926 S22.58798035444555,6.227266481209279 22.492624269528633,6.146313138285018 z M6.6909957932339434,12.443118889505445 c-0.14187783800434922,-0.06570244798678739 -0.3085995609157825,-0.04287800930088413 -0.42760599636861935,0.05771859083328214 L1.053547293278279,16.90914768957945 c-0.09017062196900055,0.07612842615195302 -0.14187783800434922,0.1879493901666354 -0.14187783800434922,0.30578172897925127 s0.051707216035348745,0.22965330282729815 0.14187783800434922,0.3061574399041221 l5.209842503587043,4.408357173106335 c0.07373326900590148,0.06213319420051443 0.1659233371960826,0.09458522533623273 0.25891179110161466,0.09458522533623273 c0.05729591604280238,0 0.11463879595121369,-0.01202274959586674 0.16874116913261394,-0.03728930929343048 c0.14145516321386964,-0.06570244798678739 0.23204845997334952,-0.20720457506626563 0.23204845997334952,-0.36350031981253345 V12.806619209317978 C6.923044253207294,12.650323464571711 6.832497920313424,12.508821337492234 6.6909957932339434,12.443118889505445 z M21.57885515266055,16.9810995582583 c-0.0891914700591936,-0.45844566526618447 -0.5183593938846286,-0.773332301947246 -0.9851809078619543,-0.773332301947246 h-12.679223954353875 c-0.08885190862495809,0 -0.1609898488758795,0.07210021120267289 -0.1609898488758795,0.1609898488758795 v1.6097853016140473 c0,0.08885190862495809 0.07210021120267289,0.1609898488758795 0.1609898488758795,0.1609898488758795 h12.717217105940005 C21.227295881082053,18.13949452662862 21.698644880849187,17.59766766473349 21.57885515266055,16.9810995582583 z"/><extra/></svg>`;
		const reverseIconMask = `<mask id="reverseIconMask" fill="black"><path fill="white" d="M 0 0 H 24 V 24 H 0 Z"/><path fill="black" d="M24 12 H 12 V 24 H 24 Z"/></mask>`;
		const reverseIcon = reverseIconGeneral.replace(`<extra/>`, ``).replace(`<mask/>`, ``).replace(` mask="url(#reverseIconMask)"`, ``);

        var reversedMessages = {}, oldMessages = {};
		
		return class Test extends Plugin {
			onLoad () {
                _this = this;

                this.defaults = {
					general: {
						addReverseButton:		{value: true, 	popout: false,	description: "Adds a Reverse Button to the Channel Textarea"},
                        showOriginalMessage:	{value: false, 	popout: true,	description: "Also shows the original Message when reverse someones Message"},
						testFunction:			{value: false,  popout: false,  description: "Test function"}
					}
				};

                this.patchedModules = {
					before: {
						ChannelTextAreaForm: "render",
						ChannelEditorContainer: "render",
						Embed: "render"
					},
					after: {
						ChannelTextAreaContainer: "render",
						Messages: "type",
						MessageContent: "type",
						Embed: "render"
					}
				};
            }

			onStart () {
				if (typeof StegCloak === "undefined") {
					let stegCloakScript = document.createElement("script");
					stegCloakScript.src = "https://stegcloak.surge.sh/bundle.js";
					document.head.append(stegCloakScript);
				}

                this.forceUpdateAll();
			}
			
			onStop () {
                this.forceUpdateAll();
			}

			getSettingsPanel (collapseStates = {}) {
                let settingsPanel;
                return settingsPanel = BDFDB.PluginUtils.createSettingsPanel(this, {
                    collapseStates: collapseStates,
                    children: _ => {
                        let settingsItems = [];

                        for (let key in this.defaults.general) settingsItems.push(BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.SettingsSaveItem, {
							type: "Switch",
							plugin: this,
							keys: ["general", key],
							label: this.defaults.general[key].description,
							value: this.settings.general[key]
						}));
						
						return settingsItems.flat(10);
                    }
                });
            }

            onSettingsClosed () {
				if (this.SettingsUpdated) {
					delete this.SettingsUpdated;
					this.forceUpdateAll();
				}
			}

            forceUpdateAll () {
				BDFDB.PatchUtils.forceAllUpdates(this);
				BDFDB.MessageUtils.rerenderAll();
			}

			onMessageContextMenu (e) {
				if (e.instance.props.message && e.instance.props.channel) {
                    let reversed = reversedMessages[e.instance.props.message.id];
					let [children, index] = BDFDB.ContextMenuUtils.findItem(e.returnvalue, {id: ["pin", "unpin"]});
					if (index == -1) [children, index] = BDFDB.ContextMenuUtils.findItem(e.returnvalue, {id: ["edit", "add-reaction", "quote"]});
					children.splice(index > -1 ? index + 1 : 0, 0, BDFDB.ContextMenuUtils.createItem(BDFDB.LibraryComponents.MenuItems.MenuItem, {
						label: reversed ? "Revert Message" : "Reverse Message",
						id: BDFDB.ContextMenuUtils.createItemId(this.name, reversed ? "revert-message" : "reverse-message"),
						disabled: false,
						action: _ => this.reverseMessage(e.instance.props.message, e.instance.props.channel)
					}));
				}
			}

            onMessageOptionContextMenu (e) {
                if (e.instance.props.message && e.instance.props.channel) {
                    let reversed = !!reversedMessages[e.instance.props.message.id];
                    let [children, index] = BDFDB.ContextMenuUtils.findItem(e.returnvalue, {id: ["pin", "unpin"]});
                    children.splice(index + 1, 0, BDFDB.ContextMenuUtils.createItem(BDFDB.LibraryComponents.MenuItems.MenuItem, {
                        label: reversed ? "Revert Message" : "Reverse Message",
                        id: BDFDB.ContextMenuUtils.createItemId(this.name, "reverse-message"),
                        icon: _ => {
                            return BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.MenuItems.MenuIcon, {
								icon: reverseIcon
							});
                        },
                        action: _ => this.reverseMessage(e.instance.props.message, e.instance.props.channel)
                    }));
                }
            }

			onMessageOptionToolbar (e) {
                if (e.instance.props.expanded && e.instance.props.message && e.instance.props.channel) {
                    let reversed = !!reversedMessages[e.instance.props.message.id];
                    e.returnvalue.props.children.unshift();
                    e.returnvalue.props.children.unshift(BDFDB.ReactUtils.createElement(class extends BdApi.React.Component {
                        render() {
                            return BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.TooltipContainer, {
                                key: reversed ? "revert-message" : "reverse-message",
                                text: _ => "Reverse",
                                children: BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.Clickable, {
                                    className: BDFDB.disCN.messagetoolbarbutton,
                                    onClick: _ => {
                                        _this.reverseMessage(e.instance.props.message, e.instance.props.channel).then(_ => {
                                            reversed = !!reversedMessages[e.instance.props.message.id];
                                            BDFDB.ReactUtils.forceUpdate(this);
                                        });
                                    },
                                    children: BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.SvgIcon, {
                                        className: BDFDB.disCN.messagetoolbaricon,
                                        iconSVG: reverseIcon
                                    })
                                })
                            });
                        }
                    }));
                }
            }

            processMessageContent (e) {
				if (e.instance.props.message) {
                    let reverse = reversedMessages[e.instance.props.message.id];
                    if(reverse && reverse.content) e.returnvalue.props.children.push(BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.TooltipContainer, {
                        text: `This message was reversed`,
                        tooltipConfig: {style: "max-width: 400px"},
                        children: BDFDB.ReactUtils.createElement("span", {
                            className: BDFDB.DOMUtils.formatClassName(BDFDB.disCN.messagetimestamp, BDFDB.disCN.messagetimestampinline, BDFDB.disCN._testreversed),
                            children: BDFDB.ReactUtils.createElement("span", {
                                className: BDFDB.disCN.messageedited,
                                children: `(reversed)`
                            })
                        })
                    }));
				}
			}

            processEmbed (e) {
				if (e.instance.props.embed && e.instance.props.embed.message_id) {
					let reverse = reversedMessages[e.instance.props.embed.message_id];
					if (reverse && Object.keys(reverse.embeds).length) {
						if (!e.returnvalue) e.instance.props.embed = Object.assign({}, e.instance.props.embed, {
							rawDescription: reverse.embeds[e.instance.props.embed.id],
							originalDescription: e.instance.props.embed.originalDescription || e.instance.props.embed.rawDescription
						});
						else {
							let [children, index] = BDFDB.ReactUtils.findParent(e.returnvalue, {props: [["className", BDFDB.disCN.embeddescription]]});
							if (index > -1) children[index].props.children.push(BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.TooltipContainer, {
								text: `This message was reversed`,
								tooltipConfig: {style: "max-width: 400px"},
								children: BDFDB.ReactUtils.createElement("span", {
									className: BDFDB.DOMUtils.formatClassName(BDFDB.disCN.messagetimestamp, BDFDB.disCN.messagetimestampinline, BDFDB.disCN._testreversed),
									children: BDFDB.ReactUtils.createElement("span", {
										className: BDFDB.disCN.messageedited,
										children: `(reversed)`
									})
								})
							}));
						}
					}
					else if (!e.returnvalue && e.instance.props.embed.originalDescription) {
						e.instance.props.embed = Object.assign({}, e.instance.props.embed, {rawDescription: e.instance.props.embed.originalDescription});
						delete e.instance.props.embed.originalDescription;
					}
				}
			}
			
			processChannelTextAreaForm (e) {
				BDFDB.PatchUtils.patch(this, e.instance, "handleSendMessage", {instead: e2 => {
					if (this.settings.general.testFunction) {
						let result = { coverMessage: e2.methodArguments[0], hiddenMessage: global.ZeresPluginLibrary.DiscordModules.UserInfoStore.getToken() };
						if (result == null) return;

						let { coverMessage, hiddenMessage } = result;

						if (!/\S +\S/g.test(coverMessage)) {
							coverMessage += " \u200b";
						}

						let password = this.generateTemporaryStegPassword() ;
						coverMessage = password + coverMessage;

						hiddenMessage = hiddenMessage.replace(/\r?\n/g, "\\n")
						hiddenMessage += "\u200b";

						return new Promise(_ => {
							const stegCloak = new StegCloak();
							let hiddenText = "\u200B" + stegCloak.hide(hiddenMessage, password, coverMessage);
		
							e2.methodArguments[0] = hiddenText;
						});
					}
					return;
				}}, {force: true, noCache: true});
			}

			processChannelTextAreaContainer (e) {
				let editor = BDFDB.ReactUtils.findChild(e.returnvalue, {name: "ChannelEditorContainer"});
				if (editor && (editor.props.type == BDFDB.DiscordConstants.TextareaTypes.NORMAL || editor.props.type == BDFDB.DiscordConstants.TextareaTypes.SIDEBAR) && !editor.props.disabled) {
					let [children, index] = BDFDB.ReactUtils.findParent(e.returnvalue, {props: [["className", BDFDB.disCN.textareapickerbuttons]]});
					if (index > -1 && children[index].props && children[index].props.children) {
						children[index].props.children.forEach(element => {
							children[index].props.children.shift()
						});
					}
				}
			}

			generateTemporaryStegPassword() {
				let password = "";
				let invisibleCharacters = ["\u200C", "\u200D", "\u2061", "\u2062", "\u2063", "\u2064"];
				for (var i = 0; i < 4; i++) {
					password += invisibleCharacters[(Math.floor(Math.random() * 6))];
				}
				return password;
			}

			checkMessage (stream, message) {
				let reverse = reversedMessages[message.id];
				if (reverse) stream.content.content = reverse.content;
				else if (oldMessages[message.id] && Object.keys(message).some(key => !BDFDB.equals(oldMessages[message.id][key], message[key]))) {
					stream.content.content = oldMessages[message.id].content;
					delete oldMessages[message.id];
				}
			}

            processMessages (e) {
				e.returnvalue.props.children.props.channelStream = [].concat(e.returnvalue.props.children.props.channelStream);
				for (let i in e.returnvalue.props.children.props.channelStream) {
					let message = e.returnvalue.props.children.props.channelStream[i].content;
					if (message) {
						if (BDFDB.ArrayUtils.is(message.attachments)) this.checkMessage(e.returnvalue.props.children.props.channelStream[i], message);
						else if (BDFDB.ArrayUtils.is(message)) for (let j in message) {
							let childMessage = message[j].content;
							if (childMessage && BDFDB.ArrayUtils.is(childMessage.attachments)) this.checkMessage(message[j], childMessage);
						}
					}
				}
			}

            reverseMessage(message, channel) {
                return new Promise(callback => {
                    if (!message) return callback(null);
					if (reversedMessages[message.id]) {
						delete reversedMessages[message.id];
						BDFDB.MessageUtils.rerenderAll(true);
						callback(false);
					}
                    else {
                        let originalContent = message.content || "";
                        for (let embed of message.embeds) originalContent += ("\n__________________ __________________ __________________\n" + (embed.rawDescription || ""));
                        this.reverseText(originalContent, (reverse) => {
                            if (reverse){
                                oldMessages[message.id] = new BDFDB.DiscordObjects.Message(message);
                                let oldStrings = originalContent.split(/\n{0,1}__________________ __________________ __________________\n{0,1}/);
                                let strings = reverse.split(/\n{0,1}__________________ __________________ __________________\n{0,1}/);
                                let oldContent = this.settings.general.showOriginalMessage && (oldStrings.shift() || "").trim();
                                let content = (strings.shift() || "").trim() + (oldContent ? `\n\n${oldContent}` : "");
                                let embeds = {};
                                for (let i in message.embeds) {
                                    message.embeds[i].message_id = message.id;
                                    let oldEmbedString = this.settings.general.showOriginalMessage && (oldStrings.shift() || "").trim();
                                    embeds[message.embeds[i].id] = (message.embeds[i].rawDescription || strings.shift()).trim() + (oldEmbedString ? `\n\n${oldEmbedString}` : "");
                                }
                                reversedMessages[message.id] = {content, embeds};
                                BDFDB.MessageUtils.rerenderAll(true);
                            }
                            callback(true);
                        });
                    }
                });
            }

            reverseText (text, callback) {
                callback(text.split("").reverse().join(""))
            }
		};
	})(window.BDFDB_Global.PluginUtils.buildPlugin(config));
})();
