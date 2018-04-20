$(document).ready(function() {

    // Navigation gets focus by default
    $('.primary-navigation').addClass('active');
    $('.active .content-wrapper').eq(1).addClass('focus');

    goTo = "Not defined";


    function navBehaviour() {

      //Focus should have already switched as part of the keypresses bit but this will clear any timeouts set
      clearTimeout(changeView);

      //Get the current section i.e. Home, Channels, Categories
      var currentSection = $('.active .content-wrapper.focus').index() +1;

      //setTimeout so things don't change instantly
      var changeView = setTimeout(function(){

      //if Home then:
      if (currentSection == 2) {

        //hide the current container
        $('.container').hide();

        //show the channels container
        $('.container.homepage').show();

      //if Channels then:
      } else if (currentSection == 3) {

        //hide the current container
        $('.container').hide();

        //show the channels container
        $('.container.channels').show();

      //if Categories then:
      } else if (currentSection == 4 ) {

        //hide the current container
        $('.container').hide();

        //show the channels container
        $('.container.categories').show();


      }

      }, 600);

    }


    // // For the horizontal adjustment of carousels
    function adjustContent() {

        total = $('.active .content-wrapper').length;
        current = $('.active .content-wrapper.focus').index() + 1;
        widthToMove = parseInt($('.active .content-wrapper.focus').outerWidth(true)) + 1;

        //This makes sure only carousels and collections move horizontally and rows/grids don't
        if ($('.carousel').hasClass('active') || $('.collection').hasClass('active')) {
            carouselPositionX = parseInt($('.active .carousel-content').css('transform').split(',')[4]);
        }

    }

    //For the vertical adjustment of sections
    function adjustSection() {

      // total = target the parent of the active slice and then grab all the children. i.e. All the siblings
      total = $('.active').parent().children().length;
      current = $('.active').index() + 1;

      if (current == 1) {
      distanceToMove = ($('.active').outerHeight(true) / 1.2);
    }  else {
      distanceToMove = ($('.active').outerHeight(true) / 2) + ($('.active').next().outerHeight(true) / 2);
    }

      if ($('.endlessgrid').hasClass('active')) {
        gridInnerPositionY = parseInt($('.endlessgrid.active').parent().css('transform').split(',')[5]);
      } else {
        containerInnerPositionY = parseInt($('.container-inner').css('transform').split(',')[5]);
      }

    }

    function navHide() {

      if (current == 2) {
        $('.primary-navigation').fadeOut(320);
      } else if (current == 1) {
        $('.primary-navigation').fadeIn(320);
      }

    }

    //Moving left
    function moveLeft() {

      adjustContent();

      if (current > 1) {

        //When moving through carousels and rows
        if ($('.carousel').hasClass('active') || $('.row').hasClass('active') || $('.primary-navigation').hasClass('active')) {

          //Remove focus from current content item and add to the previous item
          $('.active .content-wrapper.focus').removeClass('focus').prev().addClass('focus');

          //Large carousels only move if they're not the last 1 or the first 1
          if ($('.carousel.active').hasClass('large')) {

            if (current < total && !(current == 2)) {

              var adjust = carouselPositionX + widthToMove;
              $('.active .carousel-content').css('transform', 'translateX(' + adjust + 'px)');

            }

            //Medium carousels only move if they're not the last 2 or the first 1
          } else if ($('.carousel.active').hasClass('medium')) {

            if (current < total - 1 && !(current == 2)) {

              var adjust = carouselPositionX + widthToMove;
              $('.active .carousel-content').css('transform', 'translateX(' + adjust + 'px)');

              }

            } else if ($('.carousel.active').hasClass('nav')) {

              $('.carousel.active .carousel-content .content-wrapper:last-child').prependTo($('.carousel.active .carousel-content'));

            }

        } else if ($('.collection').hasClass('active')) {

            if (current == 2) {

              var adjust = carouselPositionX + 530;
              $('.active .live-info').fadeIn(300);
              $('.active .carousel-content').css('transform', 'translateX(' + adjust + 'px)');
              $('.active .content-wrapper.focus').removeClass('focus').prev().addClass('focus');

            } else if (current > total - 4) {

              $('.active .content-wrapper.focus').removeClass('focus').prev().addClass('focus');

            }

          }

          if ($('.primary-navigation').hasClass('active')) {

            navBehaviour();

          }

        }

      }

    //Moving right
    function moveRight() {

      adjustContent();

      //Only move right if the current content item is not the last in a slice
      if (current < total) {

        //Picking out the carousel, row and primary navigation movement
        if ($('.carousel').hasClass('active') || $('.row').hasClass('active') || $('.primary-navigation').hasClass('active')) {

            //Large carousels only move if they're not the last 2
          if ($('.carousel.active').hasClass('large')) {

            if ((current < total-1) && !(current == 1)) {

              var adjust = carouselPositionX - widthToMove;
              $('.active .carousel-content').css('transform', 'translateX(' + adjust + 'px)');

            }

            //Medium carousels only move if they're not the last 3
          } else if ($('.carousel.active').hasClass('medium')) {

            if ((current < total-2) && !(current == 1)) {

              var adjust = carouselPositionX - widthToMove;
              $('.active .carousel-content').css('transform', 'translateX(' + adjust + 'px)');

            }

          } else if ($('.carousel.active').hasClass('nav')) {

            reinsert = $('.carousel.active .carousel-content .content-wrapper:first-child').appendTo($('.carousel.active .carousel-content'));

          }

          //Remove focus from current content item and add to the one of the left
          $('.active .content-wrapper.focus').removeClass('focus').next().addClass('focus');

          if ($('.primary-navigation').hasClass('active')) {

            navBehaviour();

          }

        }

        }

      }

      function moveUp() {

        adjustSection();

        if (current == 1) {

          $('.active').removeClass('active');
          $('.primary-navigation').addClass('active');
          $('.content-wrapper.focus').addClass('wasfocus').removeClass('focus');

        } else if (current > 1) {

          //For the vertical adjustment of the screen
          if ($('.carousel').hasClass('active') || $('.row').hasClass('active') || $('.collection').hasClass('active')) {

            //Change active state to the slice above
            $('.active').removeClass('active').prev().addClass('active');

            //This gets the height of the item we're moving to
            adjustSection();

            //This calculates the distance needed to move the container
            var adjust = containerInnerPositionY + distanceToMove;

            //This then moves the container the distance of 'adjust'
            $('.container-inner').css('transform', 'translateY(' + adjust + 'px)');
            $('.content-wrapper.focus').addClass('wasfocus').removeClass('focus');

            }
          }

          //Logic of returning focus to item above
          if ($('.active .content-wrapper').hasClass('wasfocus')) {
              $('.active .content-wrapper.wasfocus').addClass('focus').removeClass('wasfocus');
          } else {
              $('.active .content-wrapper:eq(0)').addClass('focus');
          }

        navHide();

        }

        function moveDown() {

          adjustSection();

          if ($('.primary-navigation').hasClass('active')) {

            //Remove active class from navigation and give to first slice
            $('.active').removeClass('active');

            //if home was focussed
            if ($('.primary-navigation .content-wrapper:eq(1)').hasClass('focus')) {

              $('.container.homepage .container-inner').children().eq(0).addClass('active');

            }

            //if channels was focussed
            else if ($('.primary-navigation .content-wrapper:eq(2)').hasClass('focus')) {

              $('.container.channels .secondary-navigation').children().eq(0).addClass('active');

            }

            //if categories was focussed
            else if ($('.primary-navigation .content-wrapper:eq(3)').hasClass('focus')) {

              $('.container.categories .secondary-navigation').children().eq(0).addClass('active');

            }

            //Remove the focus state from the primary nav and add to the first item
            $('.content-wrapper.focus').addClass('wasfocus').removeClass('focus');

            //For the vertical adjustment of the screen
          } else if ($('.carousel').hasClass('active') || $('.row').hasClass('active') || $('.collection').hasClass('active')) {

            if (current < total) {

              var adjust = containerInnerPositionY - distanceToMove;
              $('.container-inner').css('transform', 'translateY(' + adjust + 'px)');
              $('.active').removeClass('active').next().addClass('active');
              $('.content-wrapper.focus').addClass('wasfocus').removeClass('focus');

            }

          }

          //Logic of returning focus to item below
          if ($('.active .content-wrapper').hasClass('wasfocus')) {
            $('.active .content-wrapper.wasfocus').addClass('focus').removeClass('wasfocus');
          } else {
            $('.active .content-wrapper:eq(0)').addClass('focus');
          }

          adjustSection();
          navHide();

        }

        function pressEnter() {

          if ($('.viewAll').hasClass('focus')) {

              //get the data-id of the current slice
              goTo = $('.active').attr("data-id");

              //replace the focus with a 'back to this' focus state
              $('.content-wrapper.focus').addClass('lastfocus').removeClass('focus');

              //replace the active section with a 'back to this' state
              $('.active').addClass('lastActive').removeClass('active');

              //hide the display of the current container and primary navigation
              $('.container.homepage').hide();
              $('.primary-navigation').hide();

              //using the data id: display the correct container
              $('.container.onwardJourney[data-id=' + goTo + ']').show();

              //give focus to the relevant content item
              $('.container.onwardJourney[data-id=' + goTo + '] .container-grid').children().eq(0).addClass('active');
              $('.active .content-wrapper:first').addClass('focus');

          }

          if ($('.viewCat').hasClass('focus')) {

              //get the data-id of the current slice
              goTo = $('.active').attr("data-id");

              //replace the focus with a 'back to this' focus state
              $('.content-wrapper.focus').addClass('lastfocus').removeClass('focus');

              //replace the active section with a 'back to this' state
              $('.active').addClass('lastActive').removeClass('active');

              //hide the display of the current container
              $('.container.homepage').hide();

              //using the data id: display the correct container
              $('.container.category[data-id=' + goTo + ']').show();

              //give focus to the relevant content item
              $('.container.category[data-id=' + goTo + '] .container-grid').children().eq(0).addClass('active');
              $('.active .content-wrapper:first').addClass('focus');

          }

          if ($('.viewAtoZ').hasClass('focus')) {

              //get the data-id of the current slice
              goTo = $('.active').attr("data-id");

              //replace the focus with a 'back to this' focus state
              $('.content-wrapper.focus').addClass('lastfocus').removeClass('focus');

              //replace the active section with a 'back to this' state
              $('.active').addClass('lastActive').removeClass('active');

              //hide the display of the current container
              $('.container.homepage').hide();
              $('.primary-navigation').hide();

              //using the data id: display the correct container
              $('.container.atoz[data-id=' + goTo + ']').show();

              //give focus to the relevant content item
              $('.container.atoz[data-id=' + goTo + '] .container-grid').children().eq(0).addClass('active');
              $('.active .content-wrapper:first').addClass('focus');

          }

          if ($('.container-grid .app-footer').hasClass('focus')) {

              //remove the focus from the content item
              $('.content-wrapper.focus').removeClass('focus');

              //remove the active class from the grid and give back to lastActive
              $('.active').removeClass('active');

              //hide the display of the current container
              $('.container.onwardJourney').hide();
              $('.container.category').hide();
              $('.container.atoz').hide();

              //reset view back to 0
              $('.container-grid').css('transform', 'translateY(0px)');

              //show the homepage and nav
              $('.container.homepage').show();
              $('.primary-navigation').show();


              //find the lastActive div and make active
              $('.container.homepage').children().find('.lastActive').removeClass('lastActive').addClass('active');

              //give focus to the relevant content item
              $('.active .content-wrapper.lastfocus').addClass('focus').removeClass('lastfocus');

          }

        }

        function goBack() {


          adjustContent();

          //remove the class of focus from the content item
          $('.active .content-wrapper.focus').removeClass('focus');

          if (current > 1 && $('.carousel').hasClass('active')) {

            //give focus to the first content item in the carousel
            $('.active .content-wrapper:first').addClass('focus');

            //reset the translateX position of the carousel
            $('.active .carousel-content').css('transform', 'translateX(0px)');

          } else {

            //reset view to top of page
            $('.container-inner').css('transform', 'translateY(0px)');

            //show the primary $('.primary-navigation').fadeIn(320);
            $('.primary-navigation').fadeIn(320);

            //give primary nav active state
            $('.active').removeClass('active');
            $('.primary-navigation').addClass('active');

            //remove focus from content item
            $('.active .content-wrapper').removeClass('focus');

            //give previously highlighted tab focus
            if ($('.active .content-wrapper').hasClass('wasfocus')) {
                $('.active .content-wrapper.wasfocus').addClass('focus').removeClass('wasfocus');
            } else {
                $('.active .content-wrapper:eq(0)').addClass('focus');
            }

            //Reset all carousels and previous focusses
            $('.container-inner .content-wrapper').removeClass('wasfocus');
            $('.container-inner .carousel-content').css('transform', 'translateX(0px)');

          }

        }



    // On *any* keydown event
    $(document).keydown(function(e) {

      e.preventDefault();

      if (e.keyCode == 37) {

        moveLeft();

      }

      if (e.keyCode == 38) {

        moveUp();

      }

      if (e.keyCode == 39) {

        moveRight();

      }

      if (e.keyCode == 40) {

        moveDown();

      }

      if (e.keyCode == 13) {

        pressEnter();

      }

      if (e.keyCode == 27 || e.keyCode == 8) {

        goBack();

      }

          //GRID KEY COMMANDS
        if ($('.endlessgrid').hasClass('active')) {

            // Press down
            if (e.keyCode == 40) {

              adjustSection();

              //if the grid is the only thing in the view (Not a A-Z to Cat page)
              if (total == 1) {

                //Do nothing (This is for A-Z and Category pages where we don't want to move around the screen)

              //if the grid has another slice above or below it (ie. A back to home button)
              } else if (total > 1) {

                adjustContent();

                //if it's not any of the last 4 content items
                if (current < total -3) {

                  var adjust = gridInnerPositionY - 260;

                  $('.active .grid-content .content-wrapper.focus').removeClass('focus').nextAll().eq(3).addClass('focus');
                  $('.active').parent().css('transform', 'translateY(' + adjust + 'px)');

                // if it is one of the last 4 content items
                } else {

                  if (total % 4 == 0) {

                  $('.active').removeClass('active').next().addClass('active');

                  $('.content-wrapper.focus').addClass('wasfocus').removeClass('focus');

                  if ($('.active .content-wrapper').hasClass('wasfocus')) {
                      $('.active .content-wrapper.wasfocus').addClass('focus').removeClass('wasfocus');
                  } else {
                      $('.active .content-wrapper:eq(0)').addClass('focus');
                  }

                } else if (total % 4 == 3) {

                  if (current == total) {

                    $('.active').removeClass('active').next().addClass('active');

                    $('.content-wrapper.focus').addClass('wasfocus').removeClass('focus');

                    if ($('.active .content-wrapper').hasClass('wasfocus')) {
                        $('.active .content-wrapper.wasfocus').addClass('focus').removeClass('wasfocus');
                    } else {
                        $('.active .content-wrapper:eq(0)').addClass('focus');
                    }

                  }

                  if (current == total -1 ) {

                    $('.active').removeClass('active').next().addClass('active');

                    $('.content-wrapper.focus').addClass('wasfocus').removeClass('focus');

                    if ($('.active .content-wrapper').hasClass('wasfocus')) {
                        $('.active .content-wrapper.wasfocus').addClass('focus').removeClass('wasfocus');
                    } else {
                        $('.active .content-wrapper:eq(0)').addClass('focus');
                    }

                  } else if (current == total -2) {

                    $('.active').removeClass('active').next().addClass('active');

                    $('.content-wrapper.focus').addClass('wasfocus').removeClass('focus');

                    if ($('.active .content-wrapper').hasClass('wasfocus')) {
                        $('.active .content-wrapper.wasfocus').addClass('focus').removeClass('wasfocus');
                    } else {
                        $('.active .content-wrapper:eq(0)').addClass('focus');
                    };

                  } else if (current == total -3) {

                    var adjust = gridInnerPositionY - 260;

                    $('.active .grid-content .content-wrapper.focus').removeClass('focus').nextAll().eq(2).addClass('focus');
                    $('.active').parent().css('transform', 'translateY(' + adjust + 'px)');

                  }

                } else if (total % 4 == 2) {

                  if (current == total) {

                    $('.active').removeClass('active').next().addClass('active');

                    $('.content-wrapper.focus').addClass('wasfocus').removeClass('focus');

                    if ($('.active .content-wrapper').hasClass('wasfocus')) {
                        $('.active .content-wrapper.wasfocus').addClass('focus').removeClass('wasfocus');
                    } else {
                        $('.active .content-wrapper:eq(0)').addClass('focus');
                    }

                  }

                  if (current == total -1 ) {

                    var adjust = gridInnerPositionY - 260;

                    $('.active').removeClass('active').next().addClass('active');

                    $('.content-wrapper.focus').addClass('wasfocus').removeClass('focus');

                    if ($('.active .content-wrapper').hasClass('wasfocus')) {
                        $('.active .content-wrapper.wasfocus').addClass('focus').removeClass('wasfocus');
                    } else {
                        $('.active .content-wrapper:eq(0)').addClass('focus');
                    }

                  } else if (current == total -2 ) {

                    var adjust = gridInnerPositionY - 260;

                    $('.active .grid-content .content-wrapper.focus').removeClass('focus').nextAll().eq(1).addClass('focus');
                    $('.active').parent().css('transform', 'translateY(' + adjust + 'px)');

                  } else if (current == total -3) {

                    var adjust = gridInnerPositionY - 260;

                    $('.active .grid-content .content-wrapper.focus').removeClass('focus').nextAll().eq(2).addClass('focus');
                    $('.active').parent().css('transform', 'translateY(' + adjust + 'px)');

                  }

                } else if (total % 4 == 1) {

                  if (current == total) {

                    $('.active').removeClass('active').next().addClass('active');

                    $('.content-wrapper.focus').addClass('wasfocus').removeClass('focus');

                    if ($('.active .content-wrapper').hasClass('wasfocus')) {
                        $('.active .content-wrapper.wasfocus').addClass('focus').removeClass('wasfocus');
                    } else {
                        $('.active .content-wrapper:eq(0)').addClass('focus');
                    }

                  }

                  if (current == total -1 ) {

                    var adjust = gridInnerPositionY - 260;

                    console.log("I'm the third to last item, I need to move X amount");
                    $('.active .grid-content .content-wrapper.focus').removeClass('focus').nextAll().eq(0).addClass('focus');
                    $('.active').parent().css('transform', 'translateY(' + adjust + 'px)');

                  } else if (current == total -2 ) {

                    var adjust = gridInnerPositionY - 260;

                    console.log("I'm the third to last item, I need to move X amount");
                    $('.active .grid-content .content-wrapper.focus').removeClass('focus').nextAll().eq(1).addClass('focus');
                    $('.active').parent().css('transform', 'translateY(' + adjust + 'px)');

                  } else if (current == total -3) {

                    var adjust = gridInnerPositionY - 260;

                    console.log("I'm the forth to last item, I need to move X amount");
                    $('.active .grid-content .content-wrapper.focus').removeClass('focus').nextAll().eq(2).addClass('focus');
                    $('.active').parent().css('transform', 'translateY(' + adjust + 'px)');

                  }

                }

              }

            }

          }

            // Press up
            if (e.keyCode == 38) {

                adjustContent();

                if (current > 4) {

                    adjustSection();
                    var adjust = gridInnerPositionY + 260;

                    $('.active .grid-content .content-wrapper.focus').removeClass('focus').prevAll().eq(3).addClass('focus');
                    $('.active').parent().css('transform', 'translateY(' + adjust + 'px)');

                }
            }

            // Press left
            if (e.keyCode == 37) {

                adjustContent();

                var dontGoLeft = [1, 5, 9, 13, 17, 21, 25, 29, 33, 37];
                index = $.inArray(current, dontGoLeft)

                if (index == -1) {

                    $('.active .content-wrapper.focus').removeClass('focus').prev().addClass('focus');

                }

            }

            // Press right
            if (e.keyCode == 39) {

                adjustContent();

                var dontGoRight = [4, 8, 12, 16, 20, 24, 28, 32, 36, 40]
                index = $.inArray(current, dontGoRight)

                if (index == -1 && current != total) {

                    $('.active .content-wrapper.focus').removeClass('focus').next().addClass('focus');

                }

            }

        }

        //COLLECTIONS
        else if ($('.collection.live').hasClass('active')) {

            // Press left
            if (e.keyCode == 37) {

                adjustContent();

                if (current > 1) {

                    if (current <= 2) {

                        $('.collection.active .content-wrapper.focus').removeClass('focus').prev().addClass('focus');

                    } else if (current == 3) {

                        $('.active .content-wrapper.focus').removeClass('focus').prev().addClass('focus');
                        var adjust = carouselPositionX + (parseInt($('.active .live-info').width()) + parseInt($('.focus').css("margin-right")) + 4);
                        $('.active .live-info').fadeIn(340)
                        $('.active .related-content').css('left', 472);
                        $('.active .carousel-content').css('transform', 'translateX(' + adjust + 'px)');

                    } else if (current > total - 3) {

                        $('.active .content-wrapper.focus').removeClass('focus').prev().addClass('focus');

                    } else {

                        var adjust = carouselPositionX + widthToMove;
                        $('.active .carousel-content').css('transform', 'translateX(' + adjust + 'px)');
                        $('.active .content-wrapper.focus').removeClass('focus').prev().addClass('focus');

                    }
                }
            }

            // Press right
            if (e.keyCode == 39) {

                adjustContent();

                if (current < total) {

                    if (current < 2) {

                        $('.collection.active .content-wrapper.focus').removeClass('focus').next().addClass('focus');

                    } else if (current == 2) {

                        var adjust = carouselPositionX - (parseInt($('.active .live-info').width()) + parseInt($('.focus').css("margin-right")) + 4);
                        $('.active .live-info').fadeOut(10);
                        $('.active .related-content').css('left', 0);
                        $('.active .carousel-content').css('transform', 'translateX(' + adjust + 'px)');
                        $('.active .content-wrapper.focus').removeClass('focus').next().addClass('focus');

                    } else if (current > total - 4) {

                        $('.active .content-wrapper.focus').removeClass('focus').next().addClass('focus');

                    } else {

                        var adjust = carouselPositionX - widthToMove;
                        $('.active .carousel-content').css('transform', 'translateX(' + adjust + 'px)');
                        $('.active .content-wrapper.focus').removeClass('focus').next().addClass('focus');

                    }
                }
            }

            // Press down
            if (e.keyCode == 40) {

                adjustSection();

                if (current < total) {

                    var adjust = containerInnerPositionY - sectionHeight;

                    $('.container-inner').css('transform', 'translateY(' + adjust + 'px)');
                    $('.active').removeClass('active').next().addClass('active');

                    $('.content-wrapper.focus').addClass('wasfocus').removeClass('focus');

                    if ($('.active .content-wrapper').hasClass('wasfocus')) {
                        $('.active .content-wrapper.wasfocus').addClass('focus').removeClass('wasfocus');
                    } else {
                        $('.active .content-wrapper:eq(0)').addClass('focus');
                    }
                }

            }

        } else if ($('.collection').hasClass('active')) {

          //Press left
          if (e.keyCode == 37) {

              adjustContent();

              if (current > 1) {



              }
          }

        }

    });

    // On *any* keyup event
    $(document).keyup(function(e) {

      e.preventDefault();

    });

});
