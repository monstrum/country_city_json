/* ========================================================================
 *
 *
 * ========================================================================
 *
 *
 * ======================================================================== */
+function ($) {
    'use strict';
    /**
     * This is custom function apply for each anchor
     */
    $.fn.onCountryCity = function($path, $config) {
        var countries = [];

        function getCities($country) {
            var json_cities = {};
            $.ajax({
                url: $path + $country.toLowerCase() + ".json",
                //force to handle it as text
                dataType: "text",
                success: function(data) {
                    //data downloaded so we call parseJSON function
                    //and pass downloaded data
                    json_cities = jQuery.parseJSON(data);
                }
            });

            return json_cities;
        }

        function createList() {
            var html, value, cities, option;
            value = this.val();
            cities = getCities(value);
            html = '<select></select>'

            jQuery.each(cities, function(city){
                option = '<option></option>';
                option.text(city.city);
                option.val(city.city);
                html.append(option);
            });

            this.after(html);
        }

        if(!$config) {
            $.ajax({
                url: $path + "countries.json",
                //force to handle it as text
                dataType: "text",
                success: function(data) {
                    //data downloaded so we call parseJSON function
                    //and pass downloaded data
                    countries = jQuery.parseJSON(data);
                }
            });
        }

        this.on('change', function() {
            createList();
        });

        return this;
    }
}(jQuery);