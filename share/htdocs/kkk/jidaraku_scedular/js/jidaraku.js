( function( jQuery, window, undefined ) {

    jQuery( function() {
    
        // --------- 定数・変数定義 --------
        
        var ITEM_HEIGHT_MIN = 50,
            ITEM_TOP_MIN    = 70,

            ITEM_COLOR            = 'rgba( 255, 0, 0, 1 )',
            ITEM_TEMP_COLOR       = 'rgba( 255, 0, 0, 0.2 )',
            ITEM_TEMP_TOP_INIT    = 70,
            ITEM_TEMP_HEIGHT_INIT = 50,
            ITEM_TEMP_WIDTH_INIT  = 200,

            MOVE_BUTTON_COLOR       = 'rgba( 0, 0, 255, 0.2 )',
            MOVE_BUTTON_TOP_INIT    = 30,
            MOVE_BUTTON_LEFT_INIT   = 80,
            MOVE_BUTTON_HEIGHT_INIT = 40,
            MOVE_BUTTON_WIDTH_INIT  = 40,
            
            buttonId = 0,

            itemTempTop,
            itemTempHeight,
            itemTempBaseY,
            itemTempDiffY,
            
            moveButtonTop,
            moveButtonBaseY,
            moveButtonDiffY,

        // --------- 関数定義部 ---------

            mkItemTempArea = function() {

                var itemTemp = jQuery( '<div>' );
                itemTemp.css( 'position', 'absolute' );
                itemTemp.css( 'top', ITEM_TEMP_TOP_INIT + 'px' );
                itemTemp.css( 'height', ITEM_TEMP_HEIGHT_INIT + 'px' );
                //itemTemp.css( 'width', ITEM_TEMP_WIDTH_INIT + 'px' );
                itemTemp.css( 'background-color', ITEM_TEMP_COLOR );
                
                itemTempTop    = ITEM_TEMP_TOP_INIT,
                itemTempHeight = ITEM_TEMP_HEIGHT_INIT;

                return itemTemp;
            },
            
            itemTempEventTouchstart = function() {
            
                event.preventDefault();
                
                itemTempBaseY = event.changedTouches[0].pageY,
                itemTempDiffY = 0;
            },
            
            itemTempEventTouchmove = function() {
            
                event.preventDefault();
                
                var dy = event.changedTouches[0].pageY - itemTempBaseY;

                if ( ( itemTempTop + dy ) >= ITEM_TOP_MIN ) {

                    itemTempDiffY = Math.floor( dy / ITEM_HEIGHT_MIN ) * ITEM_HEIGHT_MIN;
                    item.css( 'top', itemTempTop + itemTempDiffY + 'px' );
                }
            },
            
            itemTempEventTouchend = function() {

                itemTempTop += itemTempDiffY;
                item.css( 'top', itemTempTop + 'px' );
            },
            
            itemTempEventTap = function() {
            },

            mkMoveButtonArea = function() {

                var moveButton = jQuery( '<div>' );
                moveButton.css( 'position', 'absolute' );
                moveButton.css( 'top', MOVE_BUTTON_TOP_INIT + 'px' );
                moveButton.css( 'left', MOVE_BUTTON_LEFT_INIT + 'px' );
                moveButton.css( 'height', MOVE_BUTTON_HEIGHT_INIT + 'px' );
                moveButton.css( 'width', MOVE_BUTTON_WIDTH_INIT + 'px' );
                moveButton.css( 'background-color', MOVE_BUTTON_COLOR );
                
                moveButtonTop = MOVE_BUTTON_TOP_INIT;

                return moveButton;
            },
            
            moveButtonEventTouchstart = function() {
            
                event.preventDefault();
                
                moveButtonBaseY = event.changedTouches[0].pageY,
                moveButtonDiffY = 0;

                return false;
            },
            
            moveButtonEventTouchmove = function() {
            
                event.preventDefault();
                
                var dy = event.changedTouches[0].pageY - moveButtonBaseY;

                if ( ( itemTempHeight + dy ) >= ITEM_HEIGHT_MIN ) {

                    moveButtonDiffY = Math.floor( dy / ITEM_HEIGHT_MIN ) * ITEM_HEIGHT_MIN;

                    item.css( 'height', itemTempHeight + moveButtonDiffY + 'px' );
                    moveButton.css( 'top', moveButtonTop + moveButtonDiffY + 'px' );
                }

                return false;
            },
            
            moveButtonEventTouchend = function() {

                itemTempHeight += moveButtonDiffY;
                item.css( 'height', itemTempHeight + 'px' );

                moveButtonTop += moveButtonDiffY;
                moveButton.css( 'top', moveButtonTop + 'px' );

                return false;
            };

        // --------- 実処理部 ---------
        
        // --------- イベントリスナ ---------
        
        jQuery( '#addItem' ).bind( 'tap', function() {

            // itemTempの描画とイベント作成
            var itemTemp = mkItemTempArea();
            itemTemp.bind( 'touchstart', itemTempEventTouchstart );
            itemTemp.bind( 'touchmove', itemTempEventTouchmove );
            itemTemp.bind( 'touchend', itemTempEventTouchend );

            var moveButton = mkMoveButtonArea();
            moveButton.bind( 'touchstart', moveButtonEventTouchstart );
            moveButton.bind( 'touchmove', moveButtonEventTouchmove );
            moveButton.bind( 'touchend', moveButtonEventTouchend );
            
            itemTemp.append( moveButton );
            itemTemp.bind( 'tap', function() {

                item.css( 'background-color', 'rgba( 255, 0, 0, 1 )' );
            
                // イベントを削除して、固定化
                item.unbind();
                moveButton.remove();

                // 変数のリセット
                itemTempTop    = 70;
                itemTempHeight = 50;
                moveButtonTop  = 30;
            } );
            
            jQuery( '#space' ).append( item ).trigger( 'create' );
        });
    } );

} )( jQuery, window );
