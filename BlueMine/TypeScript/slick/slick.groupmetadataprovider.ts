
// import $      from 'jquery';
import Slick from './slick.core';

export default GroupItemMetadataProvider;

/***
 * Provides item metadata for group (Slick.Group) and totals (Slick.Totals) rows produced by the DataView.
 * This metadata overrides the default behavior and formatting of those rows so that they appear and function
 * correctly when processed by the grid.
 *
 * This class also acts as a grid plugin providing event handlers to expand & collapse groups.
 * If "grid.registerPlugin(...)" is not called, expand & collapse will not work.
 *
 * @class GroupItemMetadataProvider
 * @module Data
 * @namespace Slick.Data
 * @constructor
 * @param options
 */
function GroupItemMetadataProvider(options)
{
    let _grid;
    let _defaults = {
        groupCssClass: "slick-group",
        groupTitleCssClass: "slick-group-title",
        totalsCssClass: "slick-group-totals",
        groupFocusable: true,
        totalsFocusable: false,
        toggleCssClass: "slick-group-toggle",
        toggleExpandedCssClass: "expanded",
        toggleCollapsedCssClass: "collapsed",
        enableExpandCollapse: true,
        groupFormatter: defaultGroupCellFormatter,
        totalsFormatter: defaultTotalsCellFormatter
    };

    options = $.extend(true, {}, _defaults, options);

    function defaultGroupCellFormatter(row, cell, value, columnDef, item)
    {
        if (!options.enableExpandCollapse)
        {
            return item.title;
        }

        let indentation = item.level * 15 + "px";

        return "<span class='" + options.toggleCssClass + " " +
            (item.collapsed ? options.toggleCollapsedCssClass : options.toggleExpandedCssClass) +
            "' style='margin-left:" + indentation + "'>" +
            "</span>" +
            "<span class='" + options.groupTitleCssClass + "' level='" + item.level + "'>" +
            item.title +
            "</span>";
    }

    function defaultTotalsCellFormatter(row, cell, value, columnDef, item)
    {
        return (columnDef.groupTotalsFormatter && columnDef.groupTotalsFormatter(item, columnDef)) || "";
    }

    function init(grid)
    {
        _grid = grid;
        _grid.onClick.subscribe(handleGridClick);
        _grid.onKeyDown.subscribe(handleGridKeyDown);
    }

    function destroy()
    {
        if (_grid)
        {
            _grid.onClick.unsubscribe(handleGridClick);
            _grid.onKeyDown.unsubscribe(handleGridKeyDown);
        }
    }

    function handleGridClick(e, args)
    {
        let item = this.getDataItem(args.row);
        if (item && item instanceof Slick.Group && $(e.target).hasClass(options.toggleCssClass))
        {
            let range = _grid.getRenderedRange();
            this.getData().setRefreshHints({
                ignoreDiffsBefore: range.top,
                ignoreDiffsAfter: range.bottom + 1
            });

            if (item.collapsed)
            {
                this.getData().expandGroup(item.groupingKey);
            } else
            {
                this.getData().collapseGroup(item.groupingKey);
            }

            e.stopImmediatePropagation();
            e.preventDefault();
        }
    }

    // TODO:  add -/+ handling
    function handleGridKeyDown(e)
    {
        if (options.enableExpandCollapse && (e.which == Slick.keyCode.SPACE))
        {
            let activeCell = this.getActiveCell();
            if (activeCell)
            {
                let item = this.getDataItem(activeCell.row);
                if (item && item instanceof Slick.Group)
                {
                    let range = _grid.getRenderedRange();
                    this.getData().setRefreshHints({
                        ignoreDiffsBefore: range.top,
                        ignoreDiffsAfter: range.bottom + 1
                    });

                    if (item.collapsed)
                    {
                        this.getData().expandGroup(item.groupingKey);
                    } else
                    {
                        this.getData().collapseGroup(item.groupingKey);
                    }

                    e.stopImmediatePropagation();
                    e.preventDefault();
                }
            }
        }
    }

    function getGroupRowMetadata(item)
    {
        return {
            selectable: false,
            focusable: options.groupFocusable,
            cssClasses: options.groupCssClass,
            columns: {
                0: {
                    colspan: "*",
                    formatter: options.groupFormatter,
                    editor: null
                }
            }
        };
    }

    function getTotalsRowMetadata(item)
    {
        return {
            selectable: false,
            focusable: options.totalsFocusable,
            cssClasses: options.totalsCssClass,
            formatter: options.totalsFormatter,
            editor: null
        };
    }

    return {
        init,
        destroy,
        getGroupRowMetadata,
        getTotalsRowMetadata
    };
}
