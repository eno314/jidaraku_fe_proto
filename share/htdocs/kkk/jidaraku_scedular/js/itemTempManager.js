( function( jQuery, window, undefined ) {

    jQuery.fn.ItemTempManager = function() {

        this._itemHeigthMin = 50;
        this._itemTopMin    = 70;

        this._itemTemp       = null;
        this._itemTempTop    = 70;
        this._itemTempHeight = 50;
        this._itemTempWidth  = 200;
        this._itemTempBaseY  = 0;
        this._itemTempDiffY  = 0;
        this._itemTempColor  = 'rgba( 255, 0, 0, 0.2 )';

        this._sizeChanger       = null;
        this._sizeChangerTop    = 30;
        this._sizeChangerLeft   = 80;
        this._sizeChangerHeight = 40;
        this._sizeChangerWidth  = 40;
        this._sizeChangerBaseY  = 0;
        this._sizeChangerDiffY  = 0;

        this._mkItemTempDom();
    };

    jQuery.fn.ItemTempManager.fn = {

        // --------- パブリックメソッド ---------

        getItemTempDom: function() {

            return this._itemTemp;
        },

        getSizeChangerDom: function() {

            return this._sizeChanger;
        },

        // --------- プライベートメソッド ---------

        _mkItemTempDom: function() {

            this._itemTemp = jQuery( '<div>' );

            this._itemTemp.css( 'position', 'absolute' );
            this._itemTemp.css( 'top', this._itemTempTop + 'px' );
            this._itemTemp.css( 'height', this._itemTempHeigth + 'px' );
            this._itemTemp.css( 'width', this._itemTempWidth + 'px' );
            this._itemTemp.css( 'background-color', this._itemTempColor );

            this._itemTemp.bind( 'touchstart', this._itemTempTouchstart );
            this._itemTemp.bind( 'touchmove', this._itemTempTouchmove );
            this._itemTemp.bind( 'touchend', this._itemTempTouchend );

            this._mkSizeChangerDom();
            this._itemTemp.append( this._sizeChanger );
        },

        _itemTempTouchstart: function() {

            event.preventDefault();

            this._itemTempBaseY = event.changedTouches[0].pageY,
            this._itemTempDiffY = 0;
        },

        _itemTempTouchmove: function() {

                event.preventDefault();
                
                var dy = event.changedTouches[0].pageY - this._itemTempBaseY;

                if ( ( this._itemTempTop + dy ) >= this._itemTopMin ) {

                    this._itemTempDiffY = Math.floor( dy / this._itemHeigthMin ) * this._itemHeigthMin;
                    var itemTempTop = this._itemTempTop + this._itemTempDiffY;
                    this._itemTemp.css( 'top', itemTempTop + 'px' );
                }
            },
            
            _itemTempTouchend: function() {

                this._itemTempTop += this._itemTempDiffY;
                this._itemTemp.css( 'top', this._itemTempTop + 'px' );
            },

            _mkSizeChangerDom: function() {
                
                this._sizeChanger = jQuery( '<div>' );
                
                this._sizeChanger.css( 'position', 'absolute' );
                this._sizeChanger.css( 'top', SIZE_CHANGER_TOP_INIT + 'px' );
                this._sizeChanger.css( 'left', SIZE_CHANGER_LEFT_INIT + 'px' );
                this._sizeChanger.css( 'height', SIZE_CHANGER_HEIGHT_INIT + 'px' );
                this._sizeChanger.css( 'width', SIZE_CHANGER_WIDTH_INIT + 'px' );
                this._sizeChanger.css( 'background-color', SIZE_CHANGER_COLOR );
                
                this._sizeChanger.bind( 'touchstart', this._sizeChangerTouchstart );
                this._sizeChanger.bind( 'touchmove', this._sizeChangerTouchmove );
                this._sizeChanger.bind( 'touchend', this._sizeChangerTouchend );
            },
            
            _sizeChangerTouchstart: function() {
            
                event.preventDefault();
                
                this._sizeChangerBaseY = event.changedTouches[0].pageY,
                this._sizeChangerDiffY = 0;

                return false;
            },
            
            _sizeChangerTouchmove: function() {
            
                event.preventDefault();
                
                var dy = event.changedTouches[0].pageY - this._sizeChangerBaseY;

                if ( ( this._itemTempHeight + dy ) >= this._itemHeigthMin ) {

                    this._sizeChangerDiffY = Math.floor( dy / this._itemHeigthMin ) * this._itemHeigthMin;
                    
                    var itemTempTop    = this._itemTempHeight + this._sizeChangerDiffY;
                    this._itemTemp.css( 'height', itemTempTop + 'px' );
                    
                    var sizeChangerTop = this._sizeChangerTop + this._sizeChangerDiffY;
                    this._sizeChanger.css( 'top', sizeChangerTop + 'px' );
                }

                return false;
            },
            
            _sizeChangerTouchend: function() {

                this._itemTempHeight += this._moveButtonDiffY;
                this._itemTemp.css( 'height', this._itemTempHeight + 'px' );

                this._moveButtonTop += this._moveButtonDiffY;
                this._moveButton.css( 'top', this._moveButtonTop + 'px' );

                return false;
            }
        };
    } );

} )( jQuery, window );