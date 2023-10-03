# -*- coding: utf-8 -*-
# Author: Alberto Garcia-Robledo

from .enums import NodeColorMethod, NodeSizeMethod, NodeAlphaMethod, NodeVisibilityMethod, EdgeColorMethod, EdgeWidthMethod, EdgeAlphaMethod, EdgeVisibilityMethod, MarkerColorMethod, MarkerSizeMethod, MarkerAlphaMethod, MarkerVisibilityMethod, MarkerIconMethod
import copy

DEFAULT_NODE_OPTIONS = {
    "color_method": NodeColorMethod.DEFAULT,
    "color_default": 0xa10000,
    "size_method": NodeSizeMethod.DEFAULT,
    "size_default": 0.005,
    "alpha_method": NodeAlphaMethod.DEFAULT,
    "alpha_default": 1.0,
    "visibility_method": NodeVisibilityMethod.ALWAYS
}

DEFAULT_EDGE_OPTIONS = {
    "color_method": EdgeColorMethod.DEFAULT,
    "color_default": 0x06696,
    "width_method": EdgeWidthMethod.DEFAULT,
    "width_default": 0.25,
    "alpha_method": EdgeAlphaMethod.DEFAULT,
    "alpha_default": 1.0,
    "alpha_min": 0.0,
    "visibility_method": EdgeVisibilityMethod.ALWAYS
}

DEFAULT_MARKER_OPTIONS = {
    "color_method": MarkerColorMethod.DEFAULT,
    "color_default": 0x066cc,
    "icon_method": MarkerIconMethod.DEFAULT,
    "size_method": MarkerSizeMethod.DEFAULT,
    "size_default": 0.25,
    "size_default_scale_min": 0.25,
    "size_default_scale_max": 0.5,
    "alpha_method": MarkerAlphaMethod.DEFAULT,
    "alpha_default": 1.0,
    "visibility_method": MarkerVisibilityMethod.ALWAYS,
    "enable_zoom_scaling": False,
    "enable_tooltips": False
}

DEFAULT_DEBUG_OPTIONS = {
    
}

def get_default_node_options():
    """
    Return a copy of the default node options.
    """
    return copy.copy(DEFAULT_NODE_OPTIONS)

def get_default_edge_options():
    """
    Return a copy of the default edge options.
    """
    return copy.copy(DEFAULT_EDGE_OPTIONS)

def get_default_marker_options():
    """
    Return a copy of the default marker options.
    """
    return copy.copy(DEFAULT_MARKER_OPTIONS)

def get_default_debug_options():
    """
    Return a copy of the default debug options.
    """
    return copy.copy(DEFAULT_DEBUG_OPTIONS)
