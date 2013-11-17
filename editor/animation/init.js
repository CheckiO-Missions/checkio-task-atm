requirejs(['ext_editor_1', 'jquery_190', 'components/table_1'],
    function (ext, $, TableComponent) {

        var cur_slide = {};

        ext.set_start_game(function (this_e) {
//            this_e.setAnimationHeight(800);
        });

        ext.set_process_in(function (this_e, data) {
            cur_slide["in"] = data[0];
        });

        ext.set_process_out(function (this_e, data) {
            cur_slide["out"] = data[0];
        });

        ext.set_process_ext(function (this_e, data) {
            cur_slide.ext = data;
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_process_err(function (this_e, data) {
            cur_slide['error'] = data[0];
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_animate_success_slide(function (this_e, options) {
            var $h = $(this_e.setHtmlSlide('<div class="animation-success"><div></div></div>'));
            this_e.setAnimationHeight(88);
        });

        ext.set_animate_slide(function (this_e, data, options) {
            var $content = $(this_e.setHtmlSlide(ext.get_template('animation'))).find('.animation-content');
            if (!data) {
                console.log("data is undefined");
                return false;
            }
            if (data.error) {
                $content.find('.call').html('Fail: checkio(' + ext.JSON.encode(data.referee) + ')');
                $content.find('.output').html(data.error.replace(/\n/g, ","));

                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
                $content.find('.answer').remove();
                $content.find('.explanation').remove();
                this_e.setAnimationHeight($content.height() + 60);
                return false;
            }
            var checkioInput = data.in;
            var rightResult = data.ext["answer"];
            var userResult = data.out;


            //if you need additional info from tests (if exists)
            var explanation = data.ext["explanation"];

//            $content.find('.call .call-checkio').html('checkio(' + ext.JSON.encode(checkioInput) + ')');
            $content.find('.output').html('&nbsp;Your result:&nbsp;' + ext.JSON.encode(userResult));

            //String conversion for array compare
            if (String(rightResult) != String(userResult)) {
                $content.find('.call .call-result').html('Fail: checkio(' + ext.JSON.encode(checkioInput[0]) + "," +
                    ext.JSON.encode(checkioInput[1]) + ')');
                $content.find('.answer').html('Right result:&nbsp;' + ext.JSON.encode(rightResult));
                $content.find('.answer').addClass('error');
                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
            }
            else {
                $content.find('.call').html('Pass: checkio(' + ext.JSON.encode(checkioInput[0]) + "," + ext.JSON.encode(checkioInput[1]) + ')');
                $content.find('.answer').remove();
            }

            var $table = $content.find('.explanation .exp-table');
            for (var i = 0; i < explanation.length; i++) {
                var $tr = $("<tr>");
                $tr.append($("<td>").html(explanation[i][0]));
                $tr.append($("<td>").html(explanation[i][1]));
                $tr.append($("<td>").html(explanation[i][2]));
                $tr.append($("<td>").html(explanation[i][3]));
                $table.append($tr);
            }

            this_e.setAnimationHeight($content.height() + 50);

        });

        //TRYIT
        var images_folder = '/media/files/tryit/atm/';
        var current_balance = 120;
        var history = [];
        var $el;
        var el_table;

        function isNumber(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }

        ext.set_reset_form_data(function(this_e, el){
            var $el = $(el);
            $el.find('.bn_reset').click()
        });

        ext.set_console_process_ret(function (this_e, ret) {
            $el.find('.current_balance').html(ret);
        });

        ext.set_generate_animation_panel(function (this_e) {

            $el = $(this_e.setHtmlTryIt(ext.get_template('tryit')));
            el_table = new TableComponent({
                jq_table: $el.find('.table'),
                progressive_length: 5,
                default_add_row_append: false
            });
            $el.find('.withdraw_sum').focus();

            $el.find('.current_balance').text(current_balance);

            $el.find('.bn_reset').click(function(){
                current_balance = 120;
                history = [];
                $el.find('.current_balance').html(current_balance);
                $el.find('.table .cell').remove();
            });

            $el.find('form').submit(function(e){
                var withdraw_sum = parseInt($el.find('.withdraw_sum').val(), 10);
                history.push(withdraw_sum);
                this_e.sendToConsoleCheckiO(current_balance,history);
                el_table.add_row([$el.find('.current_balance').text(), withdraw_sum])
                e.stopPropagation();
                return false;
            });

        });

    }
);
