{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 8,
			"minor" : 1,
			"revision" : 0,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 34.0, 79.0, 1449.0, 967.0 ],
		"openrect" : [ 0.0, 0.0, 0.0, 169.0 ],
		"bglocked" : 0,
		"openinpresentation" : 1,
		"default_fontsize" : 10.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial Bold",
		"gridonopen" : 1,
		"gridsize" : [ 8.0, 8.0 ],
		"gridsnaponopen" : 1,
		"objectsnaponopen" : 1,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"lefttoolbarpinned" : 0,
		"toptoolbarpinned" : 0,
		"righttoolbarpinned" : 0,
		"bottomtoolbarpinned" : 0,
		"toolbars_unpinned_last_save" : 0,
		"tallnewobj" : 0,
		"boxanimatetime" : 500,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"style" : "",
		"subpatcher_template" : "",
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-5",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 32.0, 61.0, 29.5, 20.0 ],
					"text" : "4"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-2",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "bang", "int", "int" ],
					"patching_rect" : [ 32.0, 26.0, 77.0, 20.0 ],
					"text" : "live.thisdevice"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-35",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 4,
					"outlettype" : [ "float", "float", "float", "float" ],
					"patcher" : 					{
						"fileversion" : 1,
						"appversion" : 						{
							"major" : 8,
							"minor" : 1,
							"revision" : 0,
							"architecture" : "x64",
							"modernui" : 1
						}
,
						"classnamespace" : "box",
						"rect" : [ 59.0, 104.0, 640.0, 480.0 ],
						"bglocked" : 0,
						"openinpresentation" : 0,
						"default_fontsize" : 12.0,
						"default_fontface" : 0,
						"default_fontname" : "Arial",
						"gridonopen" : 1,
						"gridsize" : [ 15.0, 15.0 ],
						"gridsnaponopen" : 1,
						"objectsnaponopen" : 1,
						"statusbarvisible" : 2,
						"toolbarvisible" : 1,
						"lefttoolbarpinned" : 0,
						"toptoolbarpinned" : 0,
						"righttoolbarpinned" : 0,
						"bottomtoolbarpinned" : 0,
						"toolbars_unpinned_last_save" : 0,
						"tallnewobj" : 0,
						"boxanimatetime" : 200,
						"enablehscroll" : 1,
						"enablevscroll" : 1,
						"devicewidth" : 0.0,
						"description" : "",
						"digest" : "",
						"tags" : "",
						"style" : "",
						"subpatcher_template" : "",
						"boxes" : [ 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-7",
									"index" : 4,
									"maxclass" : "outlet",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 141.5, 209.0, 30.0, 30.0 ]
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-6",
									"index" : 3,
									"maxclass" : "outlet",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 101.5, 209.0, 30.0, 30.0 ]
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-5",
									"index" : 2,
									"maxclass" : "outlet",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 63.5, 209.0, 30.0, 30.0 ]
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-4",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 4,
									"outlettype" : [ "float", "float", "float", "float" ],
									"patching_rect" : [ 36.0, 91.0, 74.0, 22.0 ],
									"text" : "unpack f f f f"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-3",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 2,
									"outlettype" : [ "", "" ],
									"patching_rect" : [ 36.0, 57.0, 85.0, 22.0 ],
									"text" : "route encoded"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-2",
									"maxclass" : "newobj",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 36.0, 18.0, 85.0, 22.0 ],
									"text" : "r ---from_node"
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-1",
									"index" : 1,
									"maxclass" : "outlet",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 36.0, 209.0, 30.0, 30.0 ]
								}

							}
 ],
						"lines" : [ 							{
								"patchline" : 								{
									"destination" : [ "obj-3", 0 ],
									"source" : [ "obj-2", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-4", 0 ],
									"source" : [ "obj-3", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-1", 0 ],
									"source" : [ "obj-4", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-5", 0 ],
									"source" : [ "obj-4", 1 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-6", 0 ],
									"source" : [ "obj-4", 2 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-7", 0 ],
									"source" : [ "obj-4", 3 ]
								}

							}
 ]
					}
,
					"patching_rect" : [ 32.0, 244.0, 135.0, 20.0 ],
					"saved_object_attributes" : 					{
						"description" : "",
						"digest" : "",
						"globalpatchername" : "",
						"tags" : ""
					}
,
					"text" : "p receive_encoded_values"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-9",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 32.5, 488.0, 67.0, 20.0 ],
					"text" : "s ---z_vector"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-7",
					"maxclass" : "newobj",
					"numinlets" : 4,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 32.5, 466.0, 50.5, 20.0 ],
					"text" : "pak f f f f"
				}

			}
, 			{
				"box" : 				{
					"focusbordercolor" : [ 0.313725490196078, 0.313725490196078, 0.313725490196078, 0.0 ],
					"id" : "obj-12",
					"maxclass" : "live.slider",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 152.5, 328.5, 39.0, 95.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 222.999999463558197, 4.166666150093079, 39.0, 162.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_mmin" : -2.0,
							"parameter_longname" : "Latent Dimension #4",
							"parameter_initial_enable" : 1,
							"parameter_mmax" : 2.0,
							"parameter_steps" : 2048,
							"parameter_initial" : [ 0.0 ],
							"parameter_shortname" : "latent_4",
							"parameter_type" : 0,
							"parameter_unitstyle" : 1
						}

					}
,
					"showname" : 0,
					"shownumber" : 0,
					"slidercolor" : [ 0.568627450980392, 0.525490196078431, 0.525490196078431, 1.0 ],
					"textcolor" : [ 0.682352941176471, 0.611764705882353, 0.611764705882353, 1.0 ],
					"tribordercolor" : [ 0.313725490196078, 0.313725490196078, 0.313725490196078, 0.0 ],
					"tricolor" : [ 0.458823529411765, 0.435294117647059, 0.435294117647059, 1.0 ],
					"trioncolor" : [ 0.450980392156863, 0.627450980392157, 0.847058823529412, 1.0 ],
					"varname" : "live.slider[3]"
				}

			}
, 			{
				"box" : 				{
					"focusbordercolor" : [ 0.313725490196078, 0.313725490196078, 0.313725490196078, 0.0 ],
					"id" : "obj-11",
					"maxclass" : "live.slider",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 111.5, 328.5, 39.0, 95.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 181.999999463558197, 4.166666150093079, 39.0, 162.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_mmin" : -2.0,
							"parameter_longname" : "Latent Dimension #3",
							"parameter_initial_enable" : 1,
							"parameter_mmax" : 2.0,
							"parameter_steps" : 2048,
							"parameter_initial" : [ 0.0 ],
							"parameter_shortname" : "latent_3",
							"parameter_type" : 0,
							"parameter_unitstyle" : 1
						}

					}
,
					"showname" : 0,
					"shownumber" : 0,
					"slidercolor" : [ 0.568627450980392, 0.525490196078431, 0.525490196078431, 1.0 ],
					"textcolor" : [ 0.682352941176471, 0.611764705882353, 0.611764705882353, 1.0 ],
					"tribordercolor" : [ 0.313725490196078, 0.313725490196078, 0.313725490196078, 0.0 ],
					"tricolor" : [ 0.458823529411765, 0.435294117647059, 0.435294117647059, 1.0 ],
					"trioncolor" : [ 0.450980392156863, 0.627450980392157, 0.847058823529412, 1.0 ],
					"varname" : "live.slider[2]"
				}

			}
, 			{
				"box" : 				{
					"focusbordercolor" : [ 0.313725490196078, 0.313725490196078, 0.313725490196078, 0.0 ],
					"id" : "obj-10",
					"maxclass" : "live.slider",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 73.5, 328.5, 39.0, 95.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 140.999999463558197, 4.166666150093079, 39.0, 162.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_mmin" : -2.0,
							"parameter_longname" : "Latent Dimension #2",
							"parameter_initial_enable" : 1,
							"parameter_mmax" : 2.0,
							"parameter_steps" : 2048,
							"parameter_initial" : [ 0.0 ],
							"parameter_shortname" : "latent_2",
							"parameter_type" : 0,
							"parameter_unitstyle" : 1
						}

					}
,
					"showname" : 0,
					"shownumber" : 0,
					"slidercolor" : [ 0.568627450980392, 0.525490196078431, 0.525490196078431, 1.0 ],
					"textcolor" : [ 0.682352941176471, 0.611764705882353, 0.611764705882353, 1.0 ],
					"tribordercolor" : [ 0.313725490196078, 0.313725490196078, 0.313725490196078, 0.0 ],
					"tricolor" : [ 0.458823529411765, 0.435294117647059, 0.435294117647059, 1.0 ],
					"trioncolor" : [ 0.450980392156863, 0.627450980392157, 0.847058823529412, 1.0 ],
					"varname" : "live.slider[1]"
				}

			}
, 			{
				"box" : 				{
					"focusbordercolor" : [ 0.313725490196078, 0.313725490196078, 0.313725490196078, 0.0 ],
					"id" : "obj-3",
					"maxclass" : "live.slider",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 32.5, 328.5, 39.0, 95.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 99.999999463558197, 4.166666150093079, 39.0, 162.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_mmin" : -2.0,
							"parameter_longname" : "Latent Dimension #1",
							"parameter_initial_enable" : 1,
							"parameter_mmax" : 2.0,
							"parameter_steps" : 2048,
							"parameter_initial" : [ 0.0 ],
							"parameter_shortname" : "latent_1",
							"parameter_type" : 0,
							"parameter_unitstyle" : 1
						}

					}
,
					"showname" : 0,
					"shownumber" : 0,
					"slidercolor" : [ 0.568627450980392, 0.525490196078431, 0.525490196078431, 1.0 ],
					"textcolor" : [ 0.682352941176471, 0.611764705882353, 0.611764705882353, 1.0 ],
					"tribordercolor" : [ 0.313725490196078, 0.313725490196078, 0.313725490196078, 0.0 ],
					"tricolor" : [ 0.458823529411765, 0.435294117647059, 0.435294117647059, 1.0 ],
					"trioncolor" : [ 0.450980392156863, 0.627450980392157, 0.847058823529412, 1.0 ],
					"varname" : "live.slider"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-14",
					"maxclass" : "panel",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 381.0, 284.0, 128.0, 128.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 99.999999463558197, 4.166666150093079, 162.0, 162.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"id" : "obj-1",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "subspacer_core.maxpat",
					"numinlets" : 1,
					"numoutlets" : 0,
					"offset" : [ 0.0, 0.0 ],
					"patching_rect" : [ 32.0, 96.0, 130.0, 128.0 ],
					"presentation" : 1,
					"presentation_rect" : [ -2.0, 0.0, 358.0, 166.166666150093079 ],
					"varname" : "subspacer_core",
					"viewvisibility" : 1
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 1 ],
					"source" : [ "obj-10", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 2 ],
					"source" : [ "obj-11", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 3 ],
					"source" : [ "obj-12", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"source" : [ "obj-2", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 0 ],
					"source" : [ "obj-3", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-10", 0 ],
					"source" : [ "obj-35", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-11", 0 ],
					"source" : [ "obj-35", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-12", 0 ],
					"source" : [ "obj-35", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 0 ],
					"source" : [ "obj-35", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"source" : [ "obj-5", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-9", 0 ],
					"source" : [ "obj-7", 0 ]
				}

			}
 ],
		"parameters" : 		{
			"obj-1::obj-49" : [ "Set Chord Track", "Set Chord Track", 0 ],
			"obj-1::obj-16" : [ "Train Model", "Train Model", 0 ],
			"obj-1::obj-15" : [ "Create New Model", "Create New Model", 0 ],
			"obj-1::obj-8" : [ "Save Model", "Save Model", 0 ],
			"obj-1::obj-5" : [ "Load Model", "Load Model", 0 ],
			"obj-1::obj-31" : [ "Encode", "Encode", 0 ],
			"obj-10" : [ "Latent Dimension #2", "latent_2", 0 ],
			"obj-12" : [ "Latent Dimension #4", "latent_4", 0 ],
			"obj-1::obj-76" : [ "live.toggle", "live.toggle", 0 ],
			"obj-1::obj-99::obj-51" : [ "saved_model", "saved_model", 0 ],
			"obj-1::obj-63" : [ "Training Epochs", "Training Epochs", 0 ],
			"obj-1::obj-103::obj-94" : [ "checkpoint", "checkpoint", 0 ],
			"obj-1::obj-30" : [ "Set Model Checkpoint", "Set Model Checkpoint", 0 ],
			"obj-1::obj-72" : [ "live.numbox", "live.numbox", 0 ],
			"obj-1::obj-61::obj-1" : [ "Chord Track", "Chord Track", 0 ],
			"obj-11" : [ "Latent Dimension #3", "latent_3", 0 ],
			"obj-3" : [ "Latent Dimension #1", "latent_1", 0 ],
			"obj-1::obj-6" : [ "Decode", "Decode", 0 ],
			"parameterbanks" : 			{

			}

		}
,
		"dependency_cache" : [ 			{
				"name" : "subspacer_core.maxpat",
				"bootpath" : "~/code/southbank_ai/devices/vae_subspacer/patchers",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "n4m.monitor.maxpat",
				"bootpath" : "~/code/southbank_ai/devices/vae_subspacer/patchers",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "resize_n4m_monitor_patcher.js",
				"bootpath" : "~/code/southbank_ai/devices/vae_subspacer/code",
				"patcherrelativepath" : "../code",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "fit_jweb_to_bounds.js",
				"bootpath" : "~/code/southbank_ai/devices/vae_subspacer/code",
				"patcherrelativepath" : "../code",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "get_training_clips.maxpat",
				"bootpath" : "~/code/southbank_ai/devices/vae_subspacer/patchers",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "get_track.maxpat",
				"bootpath" : "~/code/southbank_ai/devices/vae_subspacer/patchers",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "dump_notes_from_clips.maxpat",
				"bootpath" : "~/code/southbank_ai/devices/vae_subspacer/patchers",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "get_highlighted_clip_notes.maxpat",
				"bootpath" : "~/code/southbank_ai/devices/vae_subspacer/patchers",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "status_light.maxpat",
				"bootpath" : "~/code/southbank_ai/devices/vae_subspacer/patchers",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "global_quantize_trigger.maxpat",
				"bootpath" : "~/code/southbank_ai/devices/vae_subspacer/patchers",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
 ],
		"autosave" : 0
	}

}
