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
		"rect" : [ 282.0, 180.0, 1218.0, 543.0 ],
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
		"boxanimatetime" : 200,
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
					"fontname" : "Arial",
					"fontsize" : 10.0,
					"id" : "obj-5",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 64.0, 224.0, 35.0, 18.0 ],
					"text" : "Items"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 10.0,
					"id" : "obj-4",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 400.0, 256.0, 30.0, 18.0 ],
					"text" : "<----"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 10.0,
					"id" : "obj-3",
					"linecount" : 3,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 424.0, 256.0, 136.0, 40.0 ],
					"text" : "Double click the js object to open the javascript source file in an editor window."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 10.0,
					"id" : "obj-2",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 24.0, 64.0, 129.0, 29.0 ],
					"text" : "Send a bang automatically when the device is loaded."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 10.0,
					"id" : "obj-1",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 336.0, 304.0, 41.0, 18.0 ],
					"text" : "Type >"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 10.0,
					"id" : "obj-38",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 285.0, 193.0, 62.0, 20.0 ],
					"text" : "route done"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 10.0,
					"id" : "obj-37",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 272.0, 392.0, 168.0, 29.0 ],
					"text" : "< It is assumed that we will connect to the next M4L.Chooser in a chain."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 10.0,
					"id" : "obj-36",
					"linecount" : 5,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 224.0, 96.0, 120.0, 62.0 ],
					"text" : "- Argument (required): \nthe object type\n- Attributes (optional): \nobserve 1/0, mixer 1/0, master 1/0, returns 1/0"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 10.0,
					"id" : "obj-12",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 24.0, 176.0, 61.0, 18.0 ],
					"text" : "Refresh list"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 10.0,
					"id" : "obj-11",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 336.0, 328.0, 67.0, 18.0 ],
					"text" : "< Menu sync"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 10.0,
					"id" : "obj-6",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 160.0, 64.0, 91.0, 29.0 ],
					"text" : "Messages: parent ID, bang..."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold Italic",
					"fontsize" : 11.0,
					"id" : "obj-178",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 24.0, 32.0, 366.0, 19.0 ],
					"text" : "List Live objects (e.g. tracks, devices, clips...) and store a selection"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold Italic",
					"fontsize" : 18.0,
					"id" : "obj-176",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 24.0, 8.0, 125.0, 27.0 ],
					"text" : "M4L.Chooser",
					"textcolor" : [ 0.301961, 0.337255, 0.403922, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 10.0,
					"id" : "obj-47",
					"linecount" : 7,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 400.0, 96.0, 160.0, 85.0 ],
					"text" : "< Restore path/ID. If this chooser is the first in the chain, it may be left unconnected (assuming that no restoration or local restoration are desired). Otherwise, it should be connected to the 2nd outlet of the M4L.Chooser above it."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 10.0,
					"id" : "obj-31",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 40.0, 120.0, 46.0, 20.0 ],
					"text" : "gettype"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 10.0,
					"id" : "obj-29",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "bang", "int", "int" ],
					"patching_rect" : [ 40.0, 96.0, 79.0, 20.0 ],
					"text" : "live.thisdevice"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 10.0,
					"id" : "obj-27",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 248.0, 360.0, 83.0, 20.0 ],
					"text" : "prepend iterate"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 10.0,
					"id" : "obj-16",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 232.0, 168.0, 72.0, 20.0 ],
					"text" : "patcherargs"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 10.0,
					"id" : "obj-20",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 376.0, 280.0, 39.0, 20.0 ],
					"text" : "set $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Futura Medium",
					"fontsize" : 10.0,
					"id" : "obj-21",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 376.0, 304.0, 89.0, 19.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 9.0, 7.5, 73.0, 19.0 ],
					"text" : "MIDI track"
				}

			}
, 			{
				"box" : 				{
					"comment" : "Restore path/ID",
					"id" : "obj-18",
					"index" : 2,
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 376.0, 96.0, 18.0, 18.0 ],
					"prototypename" : "M4L.Arial10"
				}

			}
, 			{
				"box" : 				{
					"comment" : "Menu sync",
					"id" : "obj-14",
					"index" : 2,
					"maxclass" : "outlet",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 312.0, 328.0, 18.0, 18.0 ],
					"prototypename" : "M4L.Arial10"
				}

			}
, 			{
				"box" : 				{
					"comment" : "Parent ID, bang...",
					"id" : "obj-49",
					"index" : 1,
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 184.0, 96.0, 18.0, 18.0 ],
					"prototypename" : "M4L.Arial10"
				}

			}
, 			{
				"box" : 				{
					"comment" : "Iterate IDs",
					"id" : "obj-52",
					"index" : 1,
					"maxclass" : "outlet",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 248.0, 392.0, 18.0, 18.0 ],
					"prototypename" : "M4L.Arial10"
				}

			}
, 			{
				"box" : 				{
					"angle" : 0.0,
					"annotation" : "Select an item.",
					"bgcolor" : [ 0.094118, 0.113725, 0.137255, 0.0 ],
					"border" : 1,
					"id" : "obj-51",
					"maxclass" : "panel",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 40.0, 240.0, 80.0, 17.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 9.0, 24.0, 87.0, 16.0 ],
					"rounded" : 0
				}

			}
, 			{
				"box" : 				{
					"annotation" : "List all available items.",
					"automation" : "arm",
					"automationon" : "trigger",
					"fontsize" : 9.0,
					"id" : "obj-25",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 40.0, 192.0, 24.0, 16.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 76.0, 11.0, 20.0, 12.0 ],
					"prototypename" : "numbers.default",
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "ListItems[3]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_initial" : [ 0.0 ],
							"parameter_speedlim" : 0.0,
							"parameter_shortname" : "ListItems",
							"parameter_enum" : [ "arm", "trigger" ],
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "list",
					"texton" : "list",
					"varname" : "ListItems"
				}

			}
, 			{
				"box" : 				{
					"color" : [ 0.984314, 0.819608, 0.05098, 1.0 ],
					"fontname" : "Arial Bold",
					"fontsize" : 12.0,
					"id" : "obj-39",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 4,
					"outlettype" : [ "", "", "", "" ],
					"patching_rect" : [ 184.0, 256.0, 211.0, 22.0 ],
					"saved_object_attributes" : 					{
						"filename" : "M4L.chooser.js",
						"parameter_enable" : 0
					}
,
					"text" : "js M4L.chooser.js #1",
					"varname" : "List&Select"
				}

			}
, 			{
				"box" : 				{
					"allowdrag" : 0,
					"annotation" : "When no item has been selected, the menu font is italic. When an item is selected, the menu displays in non-italics. Clicking the <list> buttons clears the menus, sets the font to italic, and deselects any previously selected mapping. ",
					"bgcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"bgfillcolor_color" : [ 1.0, 1.0, 1.0, 1.0 ],
					"bgfillcolor_color1" : [ 0.301961, 0.301961, 0.301961, 1 ],
					"bgfillcolor_color2" : [ 0.2, 0.2, 0.2, 1 ],
					"bgfillcolor_type" : "color",
					"fontface" : 0,
					"fontname" : "Arial Bold",
					"fontsize" : 10.0,
					"id" : "obj-41",
					"items" : [ "unnamed", ",", "unnamed", ",", "unnamed", ",", "unnamed", ",", "unnamed", ",", "unnamed" ],
					"maxclass" : "umenu",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "int", "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 40.0, 239.0, 80.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 9.0, 23.0, 87.0, 20.0 ],
					"textcolor" : [ 0.09, 0.11, 0.14, 1.0 ],
					"varname" : "Chooser"
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-38", 0 ],
					"source" : [ "obj-16", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-39", 1 ],
					"source" : [ "obj-18", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-21", 0 ],
					"source" : [ "obj-20", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-39", 0 ],
					"source" : [ "obj-25", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-52", 0 ],
					"source" : [ "obj-27", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-31", 0 ],
					"source" : [ "obj-29", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-39", 0 ],
					"source" : [ "obj-31", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-39", 0 ],
					"source" : [ "obj-38", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-14", 0 ],
					"source" : [ "obj-39", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-20", 0 ],
					"source" : [ "obj-39", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-27", 0 ],
					"source" : [ "obj-39", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-41", 0 ],
					"midpoints" : [ 193.5, 285.0, 32.5, 285.0, 32.5, 229.0, 49.5, 229.0 ],
					"source" : [ "obj-39", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-39", 0 ],
					"source" : [ "obj-41", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-39", 0 ],
					"source" : [ "obj-49", 0 ]
				}

			}
 ],
		"bgcolor" : [ 1.0, 1.0, 1.0, 0.0 ]
	}

}
