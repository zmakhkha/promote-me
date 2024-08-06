from django.contrib import admin

from.models import Tag, TagsPerUser, AppUser
@admin.register(Tag)
class FriendshipAdmin(admin.ModelAdmin):
    pass
@admin.register(TagsPerUser)
class FriendshipAdmin(admin.ModelAdmin):
    pass
@admin.register(AppUser)
class FriendshipAdmin(admin.ModelAdmin):
    pass