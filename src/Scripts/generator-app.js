function NewGeneratorApp(db, el) {
    var $el = $(el);
    var gen = NewGeneratorBase(db, el);

    gen.setRuleset(NewEncountersRuleset());
    
    initScrollSnapping();
    initScrollEffects();
    initInterfaceEvents();
    
    return {
    
    };
    
    function initInterfaceEvents() {
        $el.find('.ruleset input[type=radio]').click(function (event) {
            var ruleset = $(this).val();
            switch(ruleset) {
                case 'Legendary':
                    gen.setRuleset(NewLegendaryRuleset());
                    break;
                case 'LegendaryEncounters':
                    gen.setRuleset(NewEncountersRuleset());
                    break;
                case 'LegendaryEncountersPredator':
                    gen.setRuleset(NewPredatorsRuleset());
                    break;
            }
        });
    
        $el.find('.generate-btn').click(function (event) {
            event.preventDefault();

            var playerCount = $('.num-players input[type=radio]:checked').val();
            gen.generate(playerCount);

            $el.find('.results').show();
            $el.scrollTo($el.find('.controls'), {}, function() {
                $el.find('.settings').hide();
                $el.scrollTo(0, {duration: 0});
            });
            $el.find('.controls').addClass('split');
        });
        
        $el.find('.regenerate-btn').click(function (event) {
            event.preventDefault();

            $el.find('.settings').show();
            $el.scrollTo($('.controls'), {duration: 0});
            $el.scrollTo(0, { }, function() {
                $el.find('.results').hide();
            });

            $el.find('.controls').removeClass('split');
        });
    }
    
    function initScrollEffects() {
        var scrollThrottling = 250;
        var $settings = $el.find('.settings');
        
        $settings.find('h1').wrapInner('<span class="header-text"></span>');
        $settings.find('.header-text').css({
            'position' : 'relative',
            'left' : 0
        });
        
        //ScrollSnap doesn't fire when user has scrolled to max or min value.
        //Need to add a handler to scroll to manage that case.
        $settings.on('scroll', $.throttle(scrollThrottling, function() {
            $settings.find('.header-text').css({'left' : 0});
            
            var maxScroll = $settings.prop('scrollWidth') - $settings.outerWidth();

            if($settings.scrollLeft() === 0 || $settings.scrollLeft() === maxScroll) {
                scrollHandler();
            }
        }));
        
        $settings.on('scrollsnap', function() {
            scrollHandler();
        });
        
        function scrollHandler() {
            $settings.find('.header-text').each(function() {
                var $parentSection = $(this).closest('section');
                var offset = - $parentSection.position().left;
                var max = $parentSection.width() - $(this).outerWidth(true);
                offset = Math.min(offset, max);
                offset = Math.max(offset, 0);

                $(this).animate({'left' : offset}, scrollThrottling);
            });
            
            $settings.find('section').each(function() {
                if($(this).scrollTop() !== 0) {
                    $(this).scrollTo(0);
                }
            });
        }
    }

    function initScrollSnapping() {
        var offset = $el.find('.settings').width() * -.05;

        $el.find('.settings section').each(function() {
            $(this).before(
                $('<div></div>')
                    .addClass('snap-anchor')
                    .css({
                        'float' : 'left',
                        'height' : '100%',
                        'width' : '0',
                        'position' : 'relative',
                        'left' : offset
                    })
            );
        });
        
        $el.find('.settings .snap-anchor:first-of-type')
            .css({'left' : '0'});
        
        $el.find('.settings .snap-anchor:last-of-type')
            .css({'left' : 2 * offset});
            
        $el.find('.settings').scrollsnap({
            snaps: '.snap-anchor',
            direction: 'x',
            proximity: 10000
        });
    }
}